#!flask/bin/python
import os
import uuid

import cv2
import numpy as np
from detectron2 import model_zoo
from detectron2.config import get_cfg
from detectron2.data import MetadataCatalog
from detectron2.engine import DefaultPredictor
from detectron2.utils.logger import setup_logger
from detectron2.utils.visualizer import Visualizer
from flask import Flask, jsonify, send_from_directory, request

from config import settings

setup_logger()

app = Flask(__name__)


@app.route('/', methods=['GET'])
def health_check():
    """
    Checks the status of the server.
    :return:
    """
    return jsonify({'msg': 'I am healthy!'})


@app.route('/predict', methods=['POST'])
def predict():
    """
    It takes an image as an input & predict the objects inside it.
    :return:
    """
    image = request.files['image']
    img = np.fromfile(image, np.uint8)
    im = cv2.imdecode(img, cv2.IMREAD_COLOR)
    outputs = predictor(im)
    v = Visualizer(im[:, :, ::-1], MetadataCatalog.get(cfg.DATASETS.TRAIN[0]), scale=1.2)
    out = v.draw_instance_predictions(outputs["instances"].to("cpu"))
    img_id = uuid.uuid4()
    img_path = os.path.join(os.getcwd(), 'images', f'{img_id}.jpeg')
    cv2.imwrite(img_path, out.get_image()[:, :, ::-1])
    return jsonify({'img_id': img_id})


@app.route('/get_img_url/<img_id>', methods=['GET'])
def get_img_url(img_id):
    """
    Get image by image id.
    :param img_id: Unique image id.
    :return: an image on the basis of image_id.
    """
    return send_from_directory('images', f'{img_id}.jpeg')


def setup():
    """
    Setup configuration for predictor object.
    :return cfg: configuration object.
    """
    conf = get_cfg()
    conf.merge_from_file(model_zoo.get_config_file(settings.MODEL))
    conf.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5  # set threshold for this model
    conf.MODEL.WEIGHTS = model_zoo.get_checkpoint_url(settings.MODEL)
    conf.MODEL.DEVICE = 'cpu'
    return conf


if __name__ == '__main__':
    cfg = setup()
    predictor = DefaultPredictor(cfg)
    app.run(host=settings.HOSTNAME, port=settings.PORT, debug=True)

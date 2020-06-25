import os

HOSTNAME = os.environ.get('HOSTNAME') or '127.0.0.1'
PORT = int(os.environ.get('PORT') or 5000)
MODEL = os.environ.get('MODEL') or 'COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml'

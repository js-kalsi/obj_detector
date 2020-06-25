import importlib
import os

env = os.environ.get('ENV_NAME', 'base')
settings = importlib.import_module(f'config.{env}')

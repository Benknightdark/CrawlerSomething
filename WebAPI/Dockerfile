FROM python:alpine
EXPOSE 5000
WORKDIR /app
ADD . /app
RUN python3 -m pip install -r requirements.txt
ENV CONFIG=prod
CMD ["python3", "./src/index.py"]


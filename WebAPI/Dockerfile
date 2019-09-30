FROM python:alpine
LABEL Name=webapi Version=0.0.1
EXPOSE 5000
WORKDIR /app
ADD . /app
RUN python3 -m pip install -r requirements.txt
CMD ["python3", "index.py"]


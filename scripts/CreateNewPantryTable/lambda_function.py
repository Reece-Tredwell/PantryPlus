import sys
import psycopg2
import boto3
import json
import os



try:
    # connection = psycopg2.connect(host = os.environ["host"],
    #                                 user= os.environ["username"], 
    #                                 password = os.environ["password"], 
    #                                 dbname = os.environ["dbname"], 
    #                                 port = os.environ["port"])
    with open('D:\\PersonalProjects\\PantryPlus\\config.json', 'r') as file:
        data = json.load(file)
    connection = psycopg2.connect(host = data["host"],
                                    user= data["username"], 
                                    password = data["password"], 
                                    dbname = data["dbname"], 
                                    port = data["port"])
except psycopg2.Error as e:
    print(f"Connection Attempt Failed, error: {e}")
    

def getDBID():
    s3 = boto3.client('s3')
    DBID = s3.get_object(Bucket="####", Key="#####.json")
    # DBID = json.loads(DBID['Body'].read())
    print(DBID)
    #this is for Getting the PantryID
    

def lambda_handler(event, context):
    getDBID()
    CreateTable = f"""CREATE TABLE pantrys.{getDBID()}(
        InsertID VARCHAR(255),
        ProductID VARCHAR(255),
        UserID VARCHAR(255),
        DATEADDED VARCHAR(255)
    )"""
    with connection.cursor() as cur:
        cur.execute(CreateTable)
        connection.commit()

lambda_handler(None, None)
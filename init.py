# flask for the api and sqlite for the database
from flask import Flask, session
from flask_restful import Api, Resource
import sqlite3
global suits, ten, connection, cursor
connection = sqlite3.connect('answers.db', check_same_thread=False)
cursor = connection.cursor()
app = Flask(__name__)
api = Api(app)
class answer(Resource):
    #get the data for the messages that have been inputed
    def get(self, message, table , name):
        #try to enter data into the topic table but will create the table if one doesnt already exist
        try:
            names = []
            messages = []
            connection = sqlite3.connect('answer.db')
            cursor = connection.cursor()
            sql = "SELECT * FROM " + table
            cursor.execute(sql)
            items = cursor.fetchall()
            length = len(items)

            
            length = length - 1
            item = items[length][0]
            messages.append(item)
            item = items[length][1]
            names.append(item)

        except:
            create =  'CREATE TABLE ' + table + ' (name text, message text)'
            cursor.execute(create)
            return 'No data avaliable'
        return {'answer': messages, 'names': names}
  #input any new messages into the right tabel in the database 
    def post(self, message, table, name):
     
        connection = sqlite3.connect('answer.db')
        cursor = connection.cursor()
        sql = 'INSERT INTO ' + table + ' VALUES(?,?)'
        items = [message,name]

        cursor.execute(sql, [name, message])
        connection.commit()
        return 'GREAT SUCSESS'
        
api.add_resource(answer, '/answers/<string:table>/<string:message>/<string:name>')
if __name__  == "__main__":
    app.run(use_reloader=False, debug=True)

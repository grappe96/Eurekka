from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import time
import json
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
import numpy as np
import warnings
import datetime
from pyfcm import FCMNotification

warnings.filterwarnings('ignore')

app = Flask("__name__")

app.config["MONGO_URI"] = "mongodb://k4a404.p.ssafy.io:17562/eurekka"
app.config['MONGO_HOST'] = 'k4a404.p.ssafy.io'
app.config['MONGO_PORT'] = '17562'
app.config["MONGO_DBNAME"] = "eurekka"
app.config['MONGO_USERNAME'] = 'A404'
app.config['MONGO_PASSWORD'] = '!&flkj234598fwpro$^&*@@&gdk66k;fihi10gdfvhl49gnflkvmw945%$%!!*^%fgfga'
app.config['MONGO_AUTH_SOURCE'] = 'admin' # root user is typically defined in admin db
app.config['JSON_AS_ASCII'] = False

mongo = PyMongo(app)

APIKEY = "AAAAbJys5pQ:APA91bFkH7uAoWrakN-xJyNIZpOSnA-PA1hUONVyOvEOXJ1mRV_KGT10t8ti1VGnt_bTYkS2FBdAuSAnYIZgfSmL0hbbbQ3GR2ALD2YfGVIJGcSHz7Zl7U0sZ1HOC03kFlc4r2BlPUkK"
# TOKEN = "f0yNGiATSASazBLNsYenTW:APA91bHgkMWiXYFaIEnA5W-E7pXHZ8ocp-8HV2Xn66UObqvFi-hcaqafPbU5pNjOTd8SFHZmC1epC_1P1zbJxdDviui8cWLH-vF42-6ENrCdg_aAjij4IgqY8TzrhUZ6pUmyYxEsLoKb"
 
# 파이어베이스 콘솔에서 얻어 온 서버 키를 넣어 줌
push_service = FCMNotification(APIKEY)

@app.route('/') # to check whether the application is running correctly on port
def hello_flask():
    return 'flask is running correctly'

# @app.route('/viewRecipe', methods=['GET']) #viewing all contents of recipe
# def get_recipe():
#    recipe = mongo.db.recipe
#    dishes = []
#    dish = recipe.find()
#    for r in dish:
#       r.pop('_id')
#       dishes.append(r)
#    return jsonify(dishes)

@app.route('/viewRecipe/<refrigeratorId>', methods=['GET'])
def get_recipe(refrigeratorId):

   # 해당 냉장고 아이디의 재료를 다 가져온다.
   refrigerator = mongo.db.refrigerator
   UserRefrigerator = refrigerator.find_one({'_id' : ObjectId(refrigeratorId)})
   products = []
   noodles = UserRefrigerator['noodles']
   for product in noodles:
      product.pop('_id')
      products.append(product)
   snack = UserRefrigerator['snack']
   for product in snack:
      product.pop('_id')
      products.append(product)
   beverage = UserRefrigerator['beverage']
   for product in beverage:
      product.pop('_id')
      products.append(product)
   pickles = UserRefrigerator['pickles']
   for product in pickles:
      product.pop('_id')
      products.append(product)
   diary = UserRefrigerator['diary']
   for product in diary:
      product.pop('_id')
      products.append(product)
   health = UserRefrigerator['health']
   for product in health:
      product.pop('_id')
      products.append(product)
   powder = UserRefrigerator['powder']
   for product in powder:
      product.pop('_id')
      products.append(product)
   meat = UserRefrigerator['meat']
   for product in meat:
      product.pop('_id')
      products.append(product)
   seasoning = UserRefrigerator['seasoning']
   for product in seasoning:
      product.pop('_id')
      products.append(product)
   ocean = UserRefrigerator['ocean']
   for product in ocean:
      product.pop('_id')
      products.append(product)
   fresh = UserRefrigerator['fresh']
   for product in fresh:
      product.pop('_id')
      products.append(product)
   alcohol = UserRefrigerator['alcohol']
   for product in alcohol:
      product.pop('_id')
      products.append(product)
   frozen = UserRefrigerator['frozen']
   for product in frozen:
      product.pop('_id')
      products.append(product)
   ices = UserRefrigerator['ices']
   for product in ices:
      product.pop('_id')
      products.append(product)
   others = UserRefrigerator['others']
   for product in others:
      product.pop('_id')
      products.append(product)
   ingredients = ""
   for product in products:
      ingredients += product['ingredient'] + " "

   # 레시피 추천
   recipe = mongo.db.recipe
   dishes = []
   dish = recipe.find()
   
   for r in dish:
      r.pop('_id') # r dict 
      dishes.append(r)

   recipes = pd.DataFrame(dishes)
   recipes = recipes.append({'seq' : '1313' , 'section' : 'refrigerator', 'title' : '내 냉장고', 'parts' : ingredients} , ignore_index=True)
   count_vect = CountVectorizer(min_df=0, ngram_range=(1,2))
   prefer_mat = count_vect.fit_transform(recipes['parts'])
   prefer_sim = cosine_similarity(prefer_mat, prefer_mat)
   similar_percentage = pd.DataFrame(prefer_sim)
   recipes['percentage']=similar_percentage[1312]
   prefer_sim_sorted_ind = prefer_sim.argsort()[:, ::-1]
   similar_recipes = find_sim_recipes(recipes, prefer_sim_sorted_ind, '내 냉장고')
   similar_recipes = similar_recipes[similar_recipes['section'] == 'food'][:20]
   similar_recipes = similar_recipes.reset_index(drop=True)
   similar_recipes_dict = similar_recipes.to_dict(orient = 'index')
   return jsonify(similar_recipes_dict)

@app.route('/checkAlarm/<refrigeratorId>', methods=['GET'])
def check_alarm(refrigeratorId):
   refrigerator = mongo.db.refrigerator
   UserRefrigerator = refrigerator.find_one({'_id' : ObjectId(refrigeratorId)})
   products = []
   noodles = UserRefrigerator['noodles']
   for product in noodles:
      product.pop('_id')
      products.append(product)
   snack = UserRefrigerator['snack']
   for product in snack:
      product.pop('_id')
      products.append(product)
   beverage = UserRefrigerator['beverage']
   for product in beverage:
      product.pop('_id')
      products.append(product)
   pickles = UserRefrigerator['pickles']
   for product in pickles:
      product.pop('_id')
      products.append(product)
   diary = UserRefrigerator['diary']
   for product in diary:
      product.pop('_id')
      products.append(product)
   health = UserRefrigerator['health']
   for product in health:
      product.pop('_id')
      products.append(product)
   powder = UserRefrigerator['powder']
   for product in powder:
      product.pop('_id')
      products.append(product)
   meat = UserRefrigerator['meat']
   for product in meat:
      product.pop('_id')
      products.append(product)
   seasoning = UserRefrigerator['seasoning']
   for product in seasoning:
      product.pop('_id')
      products.append(product)
   ocean = UserRefrigerator['ocean']
   for product in ocean:
      product.pop('_id')
      products.append(product)
   fresh = UserRefrigerator['fresh']
   for product in fresh:
      product.pop('_id')
      products.append(product)
   alcohol = UserRefrigerator['alcohol']
   for product in alcohol:
      product.pop('_id')
      products.append(product)
   frozen = UserRefrigerator['frozen']
   for product in frozen:
      product.pop('_id')
      products.append(product)
   ices = UserRefrigerator['ices']
   for product in ices:
      product.pop('_id')
      products.append(product)
   others = UserRefrigerator['others']
   for product in others:
      product.pop('_id')
      products.append(product)

   check = False
   for product in products:   
      now = datetime.datetime.now()
      effective_days = (product['expirationDate'] - now).days
      if effective_days < 3 :
         check = True
   
   if check == True :
      return "True"
   else : 
      return "False"


@app.route('/alarmList/<refrigeratorId>', methods=['GET'])
def get_alarmList(refrigeratorId):
   refrigerator = mongo.db.refrigerator
   UserRefrigerator = refrigerator.find_one({'_id' : ObjectId(refrigeratorId)})
   products = []
   noodles = UserRefrigerator['noodles']
   for product in noodles:
      product.pop('_id')
      products.append(product)
   snack = UserRefrigerator['snack']
   for product in snack:
      product.pop('_id')
      products.append(product)
   beverage = UserRefrigerator['beverage']
   for product in beverage:
      product.pop('_id')
      products.append(product)
   pickles = UserRefrigerator['pickles']
   for product in pickles:
      product.pop('_id')
      products.append(product)
   diary = UserRefrigerator['diary']
   for product in diary:
      product.pop('_id')
      products.append(product)
   health = UserRefrigerator['health']
   for product in health:
      product.pop('_id')
      products.append(product)
   powder = UserRefrigerator['powder']
   for product in powder:
      product.pop('_id')
      products.append(product)
   meat = UserRefrigerator['meat']
   for product in meat:
      product.pop('_id')
      products.append(product)
   seasoning = UserRefrigerator['seasoning']
   for product in seasoning:
      product.pop('_id')
      products.append(product)
   ocean = UserRefrigerator['ocean']
   for product in ocean:
      product.pop('_id')
      products.append(product)
   fresh = UserRefrigerator['fresh']
   for product in fresh:
      product.pop('_id')
      products.append(product)
   alcohol = UserRefrigerator['alcohol']
   for product in alcohol:
      product.pop('_id')
      products.append(product)
   frozen = UserRefrigerator['frozen']
   for product in frozen:
      product.pop('_id')
      products.append(product)
   ices = UserRefrigerator['ices']
   for product in ices:
      product.pop('_id')
      products.append(product)
   others = UserRefrigerator['others']
   for product in others:
      product.pop('_id')
      products.append(product)

   necessary_food =pd.DataFrame()
   check = False
   for product in products:   
      now = datetime.datetime.now()
      effective_days = (product['expirationDate'] - now).days
      if effective_days < 3 :
         necessary_food = necessary_food.append({'name' : product['name'],'ingredient' : product['ingredient'],'dday' : effective_days},ignore_index=True)
         check = True
   
   if check == True :
      necessary_food = necessary_food.to_dict(orient = 'index')
      return jsonify(necessary_food)
   else : 
      return "정보없음"

@app.route('/alarmRecipe/<refrigeratorId>&<ingredient>', methods=['GET'])
def get_alarmRecipe(refrigeratorId,ingredient):
   refrigerator = mongo.db.refrigerator
   UserRefrigerator = refrigerator.find_one({'_id' : ObjectId(refrigeratorId)})
   products = []
   noodles = UserRefrigerator['noodles']
   for product in noodles:
      product.pop('_id')
      products.append(product)
   snack = UserRefrigerator['snack']
   for product in snack:
      product.pop('_id')
      products.append(product)
   beverage = UserRefrigerator['beverage']
   for product in beverage:
      product.pop('_id')
      products.append(product)
   pickles = UserRefrigerator['pickles']
   for product in pickles:
      product.pop('_id')
      products.append(product)
   diary = UserRefrigerator['diary']
   for product in diary:
      product.pop('_id')
      products.append(product)
   health = UserRefrigerator['health']
   for product in health:
      product.pop('_id')
      products.append(product)
   powder = UserRefrigerator['powder']
   for product in powder:
      product.pop('_id')
      products.append(product)
   meat = UserRefrigerator['meat']
   for product in meat:
      product.pop('_id')
      products.append(product)
   seasoning = UserRefrigerator['seasoning']
   for product in seasoning:
      product.pop('_id')
      products.append(product)
   ocean = UserRefrigerator['ocean']
   for product in ocean:
      product.pop('_id')
      products.append(product)
   fresh = UserRefrigerator['fresh']
   for product in fresh:
      product.pop('_id')
      products.append(product)
   alcohol = UserRefrigerator['alcohol']
   for product in alcohol:
      product.pop('_id')
      products.append(product)
   frozen = UserRefrigerator['frozen']
   for product in frozen:
      product.pop('_id')
      products.append(product)
   ices = UserRefrigerator['ices']
   for product in ices:
      product.pop('_id')
      products.append(product)
   others = UserRefrigerator['others']
   for product in others:
      product.pop('_id')
      products.append(product)

   ingredients = ""
   for product in products:   
      ingredients += product['ingredient'] + " "

   # 레시피 추천
   recipe = mongo.db.recipe
   dishes = []
   dish = recipe.find()
   
   for r in dish:
      r.pop('_id') # r dict 
      dishes.append(r)

   recipes = pd.DataFrame(dishes)
   recipes = recipes.append({'seq' : '1313' , 'section' : 'refrigerator', 'title' : '내 냉장고', 'parts' : ingredients} , ignore_index=True)
   count_vect = CountVectorizer(min_df=0, ngram_range=(1,2))
   prefer_mat = count_vect.fit_transform(recipes['parts'])
   prefer_sim = cosine_similarity(prefer_mat, prefer_mat)
   similar_percentage = pd.DataFrame(prefer_sim)
   recipes['percentage']=similar_percentage[1312]
   prefer_sim_sorted_ind = prefer_sim.argsort()[:, ::-1]
   similar_recipes = find_sim_recipes(recipes, prefer_sim_sorted_ind, '내 냉장고')
   similar_recipes = similar_recipes[similar_recipes['section'] == 'food']
   similar_recipes = similar_recipes[similar_recipes['parts'].str.contains(ingredient)]
   size = similar_recipes['section'].count()
   if size < 6 : 
      no_recipe = recipes[recipes['section'] == 'no_recipe']
      similar_recipes = pd.concat([similar_recipes,no_recipe]) 
   similar_recipes = similar_recipes.reset_index(drop=True)
   similar_recipes = similar_recipes[:5]
   similar_recipes_dict = similar_recipes.to_dict(orient = 'index')
   return jsonify(similar_recipes_dict)


def pushRecipe():
   users = mongo.db.user.find()
   refrigerator = mongo.db.refrigerator
   
   for user in users :
      refrigeratorId = user['refrigeratorId']
      userToken = user['deviceToken']
      # 해당 냉장고 아이디의 재료를 다 가져온다.
      UserRefrigerator = refrigerator.find_one({'_id' : ObjectId(refrigeratorId)})
      products = []
      noodles = UserRefrigerator['noodles']
      for product in noodles:
         product.pop('_id')
         products.append(product)
      snack = UserRefrigerator['snack']
      for product in snack:
         product.pop('_id')
         products.append(product)
      beverage = UserRefrigerator['beverage']
      for product in beverage:
         product.pop('_id')
         products.append(product)
      pickles = UserRefrigerator['pickles']
      for product in pickles:
         product.pop('_id')
         products.append(product)
      diary = UserRefrigerator['diary']
      for product in diary:
         product.pop('_id')
         products.append(product)
      health = UserRefrigerator['health']
      for product in health:
         product.pop('_id')
         products.append(product)
      powder = UserRefrigerator['powder']
      for product in powder:
         product.pop('_id')
         products.append(product)
      meat = UserRefrigerator['meat']
      for product in meat:
         product.pop('_id')
         products.append(product)
      seasoning = UserRefrigerator['seasoning']
      for product in seasoning:
         product.pop('_id')
         products.append(product)
      ocean = UserRefrigerator['ocean']
      for product in ocean:
         product.pop('_id')
         products.append(product)
      fresh = UserRefrigerator['fresh']
      for product in fresh:
         product.pop('_id')
         products.append(product)
      alcohol = UserRefrigerator['alcohol']
      for product in alcohol:
         product.pop('_id')
         products.append(product)
      frozen = UserRefrigerator['frozen']
      for product in frozen:
         product.pop('_id')
         products.append(product)
      ices = UserRefrigerator['ices']
      for product in ices:
         product.pop('_id')
         products.append(product)
      others = UserRefrigerator['others']
      for product in others:
         product.pop('_id')
         products.append(product)

      necessary_food =[]
      check = False
      for product in products:   
         now = datetime.datetime.now()
         effective_days = (product['expirationDate'] - now).days
         if effective_days < 3 :
            necessary_food.append(product['name'])
            check = True
      
      if check == True :
         for food in necessary_food : 
            sendMessage("유레까", food + " 지금 유통기한이 얼마 남지 않았습니다!!", userToken)



def find_sim_recipes(df, sorted_ind, my_refrigerator):
    
    # 인자로 입력된 plants DataFrame에서 'RCP_NM' 컬럼이 입력된 my_refrigerator 값인 DataFrame추출
    refrigerator = df[df['title'] == my_refrigerator]
    
    # my_refrigerator을 가진 DataFrame의 index 객체를 ndarray로 반환하고 
    # sorted_ind 인자로 입력된 prefer_sim_sorted_ind 객체에서 유사도 순으로 top_n 개의 index 추출
    refrigerator_index = refrigerator.index.values
    
    similar_indexes = sorted_ind[refrigerator_index]
    
    # 추출된 top_n index들 출력. top_n index는 2차원 데이터 임. 
    #dataframe에서 index로 사용하기 위해서 1차원 array로 변경

    similar_indexes = similar_indexes.reshape(-1)
    
    return df.iloc[similar_indexes]

scheduler = BackgroundScheduler()
intervalTrigger = IntervalTrigger(seconds=60)
scheduler.add_job(pushRecipe, intervalTrigger, id='pushRecipe_id')
scheduler.start()


 
def sendMessage(body, title, userToken):
    # 메시지 (data 타입)
    data_message = {
        "body": body,
        "title": title
    }
    # 토큰값을 이용해 1명에게 푸시알림을 전송함
    result = push_service.single_device_data_message(registration_id=userToken, data_message=data_message)
    # 전송 결과 출력
    print(result)
 
# sendMessage("유레까", "우유 지금 유통기한이 얼마 남지 않았습니다!!")

if __name__ == "__main__":
    app.debug = False
    app.run(host='0.0.0.0', port=5050)
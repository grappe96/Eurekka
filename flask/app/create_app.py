from flask import Flask, app, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from apscheduler.schedulers.background import BackgroundScheduler
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
import warnings
import datetime
from pyfcm import FCMNotification

warnings.filterwarnings('ignore')

def create_app():
   app = Flask(__name__)

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
   # 파이어베이스 콘솔에서 얻어 온 서버 키를 넣어 줌
   pushService = FCMNotification(APIKEY)

   @app.route('/') # to check whether the application is running correctly on port
   def checkFlask():
      return 'flask is running correctly'

   @app.route('/recipe/<refrigerId>', methods=['GET'])
   def getRecipe(refrigerId):
      # 해당 냉장고 아이디의 재료를 다 가져온다.
      refrigerator = mongo.db.refrigerator
      UserRefrigerator = refrigerator.find_one({'_id' : ObjectId(refrigerId)})
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
      
      for d in dish:
         d.pop('_id') # d dict 
         dishes.append(d)

      recipes = pd.DataFrame(dishes)
      recipes = recipes.append({'seq' : '1313' , 'section' : 'refrigerator', 'title' : '내 냉장고', 'parts' : ingredients} , ignore_index=True)
      countVect = CountVectorizer(min_df=0, ngram_range=(1,2))
      ingredientMat = countVect.fit_transform(recipes['parts'])
      ingredientSim = cosine_similarity(ingredientMat, ingredientMat)
      similarPercentage = pd.DataFrame(ingredientSim)
      recipes['percentage'] = similarPercentage[1312]
      ingredientSimSortedIndex = ingredientSim.argsort()[:, ::-1]
      similarRecipes = findSimRecipes(recipes, ingredientSimSortedIndex, '내 냉장고')
      similarRecipes = similarRecipes[similarRecipes['section'] == 'food'][:20]
      similarRecipes = similarRecipes.reset_index(drop=True)
      similarRecipesDict = similarRecipes.to_dict(orient = 'index')
      return jsonify(similarRecipesDict)

   @app.route('/recipe/checkAlarm/<refrigerId>', methods=['GET'])
   def checkAlarm(refrigerId):
      refrigerator = mongo.db.refrigerator
      UserRefrigerator = refrigerator.find_one({'_id' : ObjectId(refrigerId)})
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
         effectiveDays = (product['expirationDate'] - now).days
         if effectiveDays < 3 :
            check = True
      
      if check == True :
         return "True"
      else : 
         return "False"


   @app.route('/recipe/alarmList/<refrigerId>', methods=['GET'])
   def getAlarmList(refrigerId):
      refrigerator = mongo.db.refrigerator
      UserRefrigerator = refrigerator.find_one({'_id' : ObjectId(refrigerId)})
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

      necessaryAlarmIngredient =pd.DataFrame()
      check = False
      for product in products:   
         now = datetime.datetime.now()
         effectiveDays = (product['expirationDate'] - now).days
         if effectiveDays < 3 :
            necessaryAlarmIngredient = necessaryAlarmIngredient.append({'name' : product['name'],'ingredient' : product['ingredient'],'dday' : effectiveDays},ignore_index=True)
            check = True
      
      if check == True :
         necessaryAlarmIngredient = necessaryAlarmIngredient.to_dict(orient = 'index')
         return jsonify(necessaryAlarmIngredient)
      else : 
         return "정보없음"

   @app.route('/recipe/alarmRecipe/<refrigerId>&<ingredient>', methods=['GET'])
   def getAlarmRecipe(refrigerId,ingredient):
      refrigerator = mongo.db.refrigerator
      UserRefrigerator = refrigerator.find_one({'_id' : ObjectId(refrigerId)})
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
      
      for d in dish:
         d.pop('_id') # d dict 
         dishes.append(d)

      recipes = pd.DataFrame(dishes)
      recipes = recipes.append({'seq' : '1313' , 'section' : 'refrigerator', 'title' : '내 냉장고', 'parts' : ingredients} , ignore_index=True)
      countVect = CountVectorizer(min_df=0, ngram_range=(1,2))
      ingredientMat = countVect.fit_transform(recipes['parts'])
      ingredientSim = cosine_similarity(ingredientMat, ingredientMat)
      similarPercentage = pd.DataFrame(ingredientSim)
      recipes['percentage']=similarPercentage[1312]
      ingredientSimSortedIndex = ingredientSim.argsort()[:, ::-1]
      similarRecipes = findSimRecipes(recipes, ingredientSimSortedIndex, '내 냉장고')
      similarRecipes = similarRecipes[similarRecipes['section'] == 'food']
      similarRecipes = similarRecipes[similarRecipes['parts'].str.contains(ingredient)]
      size = similarRecipes['section'].count()
      if size < 6 : 
         noRecipe = recipes[recipes['section'] == 'no_recipe']
         similarRecipes = pd.concat([similarRecipes,noRecipe]) 
      similarRecipes = similarRecipes.reset_index(drop=True)
      similarRecipes = similarRecipes[:5]
      similarRecipesDict = similarRecipes.to_dict(orient = 'index')
      return jsonify(similarRecipesDict)


   def pushRecipe():
      users = mongo.db.user.find()
      refrigerator = mongo.db.refrigerator
      
      for user in users :
         refrigerId = user['refrigeratorId']
         userToken = user['deviceToken']
         # 해당 냉장고 아이디의 재료를 다 가져온다.
         UserRefrigerator = refrigerator.find_one({'_id' : ObjectId(refrigerId)})
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

         necessaryAlarmIngredient =[]
         check = False
         for product in products:   
            now = datetime.datetime.now()
            effectiveDays = (product['expirationDate'] - now).days
            if effectiveDays < 3 :
               necessaryAlarmIngredient.append(product['name'])
               check = True
         
         if check == True :
            for food in necessaryAlarmIngredient : 
               sendMessage("유레까", food + " 지금 유통기한이 얼마 남지 않았습니다!!", userToken)

   def findSimRecipes(df, sortedIndex, myRefrigerator):
      # 인자로 입력된 plants DataFrame에서 'RCP_NM' 컬럼이 입력된 myRefrigerator 값인 DataFrame추출
      refrigerator = df[df['title'] == myRefrigerator]
      # my_refrigerator을 가진 DataFrame의 index 객체를 ndarray로 반환하고 
      # sortedIndex 인자로 입력된 ingredientSimSortedIndex 객체에서 유사도 순으로 top_n 개의 index 추출
      refrigerator_index = refrigerator.index.values
      similarIndexes = sortedIndex[refrigerator_index]
      # 추출된 top_n index들 출력. top_n index는 2차원 데이터 임. 
      #dataframe에서 index로 사용하기 위해서 1차원 array로 변경
      similarIndexes = similarIndexes.reshape(-1)
      return df.iloc[similarIndexes]

   def sendMessage(body, title, userToken):
      # 메시지 (data 타입)
      dataMessage = {
         "body": body,
         "title": title
      }
      # 토큰값을 이용해 1명에게 푸시알림을 전송함
      result = pushService.single_device_data_message(registration_id=userToken, data_message=dataMessage)
      print(result)

   scheduler = BackgroundScheduler()
   scheduler.add_job(pushRecipe, 'cron', hour=17, id='pushRecipe_id')
   scheduler.start()

   return app
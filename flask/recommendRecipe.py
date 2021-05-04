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

warnings.filterwarnings('ignore')

app = Flask("__name__")

app.config["MONGO_URI"] = "mongodb://k4a404.p.ssafy.io:27017/eurekka"
app.config['MONGO_HOST'] = 'k4a404.p.ssafy.io'
app.config['MONGO_PORT'] = '27017'
app.config["MONGO_DBNAME"] = "eurekka"
app.config['MONGO_USERNAME'] = 'A404'
app.config['MONGO_PASSWORD'] = 'secEurekkaA404!@#$'
app.config['MONGO_AUTH_SOURCE'] = 'admin' # root user is typically defined in admin db
app.config['JSON_AS_ASCII'] = False

mongo = PyMongo(app)

@app.route('/') # to check whether the application is running correctly on port
def hello_flask():
    return 'flask is running correctly'

# @app.route('/viewRecipe', methods=['GET']) #viewing all contents of recipe
# def get_recipe():
# 	recipe = mongo.db.recipe
# 	dishes = []
# 	dish = recipe.find()
# 	for r in dish:
# 		r.pop('_id')
# 		dishes.append(r)
# 	return jsonify(dishes)

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
	recipes = recipes.append({'seq' : '1308' , 'section' : 'refrigerator', 'title' : '내 냉장고', 'parts' : ingredients} , ignore_index=True)
	count_vect = CountVectorizer(min_df=0, ngram_range=(1,2))
	prefer_mat = count_vect.fit_transform(recipes['parts'])
	prefer_sim = cosine_similarity(prefer_mat, prefer_mat)
	prefer_sim_sorted_ind = prefer_sim.argsort()[:, ::-1]
	similar_recipes = find_sim_recipes(recipes, prefer_sim_sorted_ind, '내 냉장고')
	similar_recipes = similar_recipes[similar_recipes['section'] == 'food']
	similar_recipes = similar_recipes.reset_index(drop=True)
	similar_recipes_dict = similar_recipes.to_dict(orient = 'index')
	return jsonify(similar_recipes_dict)
	

def recommandRecipes():
	users = mongo.db.user.find()
	refrigerator = mongo.db.refrigerator
	
	for user in users :
		refrigeratorId = user['refrigeratorId']
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

		ingredients = ""
		necessary_food =[]
		check = False
		for product in products:	
			now = datetime.datetime.now()
			effective_days = (product['expirationDate'] - now).days
			ingredients += product['ingredient'] + " "
			if effective_days < 3 :
				necessary_food.append(product['ingredient'])
				check = True
		
		if check == True :
			for food in necessary_food : 
				# 레시피 추천
				recipe = mongo.db.recipe
				dishes = []
				dish = recipe.find()
				
				for r in dish:
					r.pop('_id') # r dict 
					dishes.append(r)

				recipes = pd.DataFrame(dishes)
				recipes = recipes.append({'seq' : '1308' , 'section' : 'refrigerator', 'title' : '내 냉장고', 'parts' : ingredients} , ignore_index=True)
				count_vect = CountVectorizer(min_df=0, ngram_range=(1,2))
				prefer_mat = count_vect.fit_transform(recipes['parts'])
				prefer_sim = cosine_similarity(prefer_mat, prefer_mat)
				prefer_sim_sorted_ind = prefer_sim.argsort()[:, ::-1]
				similar_recipes = find_sim_recipes(recipes, prefer_sim_sorted_ind, '내 냉장고')
				similar_recipes = similar_recipes[similar_recipes['section'] == 'food']
				similar_recipes = similar_recipes[similar_recipes['parts'].str.contains(food)]
				size = similar_recipes['section'].count()
				if size < 6 : 
					no_recipe = recipes[recipes['section'] == 'no_recipe']
					similar_recipes = pd.concat([similar_recipes,no_recipe]) 
				siz = similar_recipes['section'].count()
				similar_recipes = similar_recipes.reset_index(drop=True)
				similar_recipes = similar_recipes[:5]
				similar_recipes_dict = similar_recipes.to_dict(orient = 'index')
				print(food)
				print(similar_recipes.to_dict)
				# 해당 유저한테 이 정보를 보낸다. 알림 jsonify(similar_recipes_dict)


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
intervalTrigger = IntervalTrigger(seconds=3)
scheduler.add_job(recommandRecipes, intervalTrigger, id='recommandRecipes_id')
scheduler.start()

if __name__ == "__main__":
    app.debug = True
    app.run()
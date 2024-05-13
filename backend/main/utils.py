from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from main.models import Products
import math
import nltk
from collections import Counter as Count
import re

word_r = re.compile(r"\w+")


def generate_vectors(sent):
    w = word_r.findall(sent)
    return Count(w)


def extract_keywords(description):
    stop_words = set(stopwords.words('russian'))
    tokens = word_tokenize(description.lower())
    keywords = [word for word in tokens if word.isalnum() and word not in stop_words]

    return generate_vectors(' '.join(keywords))


def cosine_similarity(vector1, vector2):
    inter = set(vector1.keys()) & set(vector1.keys())
    numer = sum([vector1[i] * vector2[i] for i in inter])

    s_1 = sum([vector1[i] ** 2 for i in list(vector1.keys())])
    s_2 = sum([vector1[i] ** 2 for i in list(vector1.keys())])
    deno = math.sqrt(s_1) * math.sqrt(s_2)

    if not deno:
        return 0.0
    else:
        return float(numer) / deno


def find_similar_products(product_id):
    product = Products.objects.get(id=product_id)
    product_keywords = extract_keywords(product.tags)

    similar_products = {}
    for other_product in Products.objects.filter(categories=product.categories, gender=product.gender).select_related('categories').exclude(id=product_id):
        other_product_keywords = extract_keywords(other_product.tags)
        similarity = cosine_similarity(product_keywords, other_product_keywords)
        #print(similarity)
        similar_products[other_product] = similarity

    similar_products = sorted(similar_products.items(), key=lambda x: x[1], reverse=True)

    return [product for product, similarity in similar_products][:10]

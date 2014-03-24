#!/usr/bin/env python

import urllib2
import json
from random import randint

hot_url = 'http://s.staging.api.gaana.com/index.php?type=song&subtype=hot_songs'
pop_url = 'http://s.staging.api.gaana.com/index.php?type=song&subtype=most_popular'

def main(url):
	arr=[]
	data = urllib2.urlopen(url).read()
	for i in json.loads(data)['tracks']:
		arr.append( gen_question_1(i) )
	return arr

def gen_question_1(item):
	d={}
	query = 'track_title'
	d['question'] = 'Which movie/album is this song from ? > %s'%(item['track_title'])
	d['answer'] = item['album_title']
	d['option1'],d['option2'],d['option3'] = gen_random(query,hot_url,d['answer'])
	return d

def gen_question_2(item):
	d={}
	query = 'track_title'
	d['question'] = 'Who is the artist of this song? > %s'%(item['track_title'])
	d['answer'] = item['album_title']
	d['option1'],d['option2'],d['option3'] = gen_random(query,hot_url),gen_random(query,hot_url),gen_random(query,hot_url)
	
	return d


def gen_random(what,url,answer):
	data = urllib2.urlopen(url).read()
	data = json.loads(data)['tracks']
	a,b,c = threerandom(len(data) -1)
	if answer not in [ data[a][what],data[b][what],data[c][what] ]:
		return data[a][what],data[b][what],data[c][what]
	else:
		return gen_random(what,url,answer)
		print 'recursion'
	
def threerandom(l):
	a = randint(0,l)
	b = randint(0,l)
	c = randint(0,l)
	if a == b or b == c or a == c:
		return threerandom(l)
	else:
		return a,b,c


if __name__ == '__main__':
	arr = main(hot_url)
	with open("data.json", "w") as f:
	    f.write(json.dumps( arr ))

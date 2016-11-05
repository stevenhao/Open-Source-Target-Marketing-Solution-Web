#!/usr/local/bin/python
import json
import sys

def cnt(str):
    return len(str)

#print "sup"

while True:
    try:
        r = raw_input()

        query = json.loads(r)
        qid = query["id"]
        name = query["name"]
        params = query["params"]

        response = []
        response["id"] = qid
        if name == "cnt":
            response["result"] = cnt(params["str"])

        print json.dumps(response)
        sys.stdout.flush()

    except EOFError:
        break


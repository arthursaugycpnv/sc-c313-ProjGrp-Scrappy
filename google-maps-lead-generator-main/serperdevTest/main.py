import http.client
import json

conn = http.client.HTTPSConnection("google.serper.dev")
payload = json.dumps({
  "q": "plombier",
  "location": "Vevey, Vaud, Switzerland",
  "gl": "ch",
  "hl": "fr"
})
headers = {
  'X-API-KEY': '62695995775ce5a0119130eeb7b5ddd019277b54',
  'Content-Type': 'application/json'
}
conn.request("POST", "/places", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))
# Quick python script to process bird json

import json, random

def is_same_species(bird1, bird2):
    return bird1['commonName'] == bird2['commonName'] and \
        bird1['speciesName'] == bird2['speciesName']

def in_list(l, bird):
    for species in l:
        if is_same_species(species, bird):
            return True
    return False

f = open('smallbirds.json')
bird_string = f.read()
f.close()
bird_json = json.loads(bird_string)
bird_names = []
# Generates random numbers for hex code
r = lambda: random.randint(0,255)
for bird in bird_json:
    # Check if this species is already in bird_names
    if in_list(bird_names, bird):
        continue
    random_color = '#%02X%02X%02X' % (r(),r(),r())
    bird_names.append({
        'commonName': bird['commonName'],
        'speciesName': bird['speciesName'],
        'color': random_color
        })
# Now sort by alphabetical order
bird_names.sort(key=lambda x: x['commonName'])

print bird_names[:10]

# Print json to file

f = open('bird_species.json', 'w')
f.write(json.dumps(bird_names, indent=2, separators=(',', ': ')))
f.close()
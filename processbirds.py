# Quick python script to process bird json

import json, random, string

def is_same_species(bird1, bird2):
    return bird1['commonName'] == bird2['commonName'] and \
        bird1['speciesName'] == bird2['speciesName']

def in_list(l, bird):
    for species in l:
        if is_same_species(species, bird):
            return True
    return False

def generate_colors():
    f = open('smallbirds.json')
    bird_string = f.read()
    f.close()
    bird_json = json.loads(bird_string)
    bird_names = []
    # Generates random numbers for hex code
    # Don't generate colors that are too close to white
    r = lambda: random.randint(0,200)
    for bird in bird_json:
        # Check if this species is already in bird_names
        if in_list(bird_names, bird):
            continue
        random_color = 'rgba({0}, {1}, {2}, 0.5)'.format(r(),r(),r())
        bird_names.append({
            'commonName': bird['commonName'],
            'speciesName': bird['speciesName'],
            'color': random_color
            })
    # Now sort by alphabetical order
    bird_names.sort(key=lambda x: x['commonName'])

    # Print json to file

    f = open('json/bird_species.json', 'w')
    f.write(json.dumps(bird_names, indent=2, separators=(',', ': ')))
    f.close()

def generate_css():
    '''
    Given a json file of birdSpecies, generates a css file
    .Species-Name-container {
        background-color: hexcode;
    }
    '''
    f = open('json/bird_species.json')
    bird_species = json.loads(f.read())
    f.close()
    f = open("css/colors.css", "w")
    for species in bird_species:
        classname = species['commonName'].replace(" ", "-")
        css = ".{0}-container * {{background-color: {1};}}\n".format(classname, species['color'])
        f.write(css)
    f.close()

generate_colors()
generate_css()
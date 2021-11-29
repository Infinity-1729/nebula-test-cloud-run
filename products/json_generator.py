import os
products='products'
dict={products:{}}
# def rec(d,d_full,dict):
#     print(d,d_full)
#     # print(os.listdir(d_full))
#     for x in os.listdir(d_full):
#         x_full=os.path.join(d_full,x)
#         if (os.path.isdir(x_full) and x!='.DS_Store'):
#             dict[x]={'files':[]}
#             print(x)
#             rec(x,x_full,dict[x])
#         elif (os.path.isfile(x_full) and x!='.DS_Store'):
#             dict['files'].append((x,x_full))
# rec('products','.',dict)

from PIL import Image
# sizes = [(120,120), (720,720), (1600,1600)]
# files = ['a.jpg','b.jpg','c.jpg']

# for image in files:
#     for size in sizes:
#         im = Image.open(image)
#         im.thumbnail(size)
#         im.save("thumbnail_%s_%s" % (image, "_".join(size)))

from shutil import rmtree
for cat in os.listdir():
    if (os.path.isdir(cat) and cat!='.DS_Store'):
        dict[products][cat]={}
        for size in os.listdir(cat):
            size_path=os.path.join(cat,size)
            if (os.path.isdir(size_path) and size!='.DS_Store'):
                generateThumb=False
                for dir in os.listdir(size_path):
                    dir_path=os.path.join(size_path,dir)
                    if (os.path.isdir(dir_path) and dir!='.DS_Store'):
                            h,w=dir.split('_')[1].split('x')
                            thumbSize=(int(h),int(w))
                            generateThumb=True
                            rmtree(dir_path)
                            os.mkdir(dir_path)
                            thumbDir=dir_path
                # if generateThumb:
                #     print(thumbSize)
                dict[products][cat][size]=[]
                for tile in os.listdir(size_path):
                    tile_path=os.path.join(size_path,tile)
                    if (os.path.isfile(tile_path) and tile!='.DS_Store'):
                        if generateThumb:
                            im=Image.open(tile_path)
                            im.thumbnail(thumbSize)
                            # thumbPath=os.path.join(size_path,'thumbnails_'+'x'.join(map(lambda x:str(x),thumbSize)),tile)
                            thumbPath=os.path.join(thumbDir,tile)
                            im.save(thumbPath)
                            thumb_path=(os.path.join('products',thumbPath))
                        # print(thumb_path)
                        tile,_=os.path.splitext(tile)
                        name,surface,thickness=tile.split('_')
                        thickness=thickness.split()[0]
                        tile_path=os.path.join('products',tile_path)
                        if generateThumb:
                            dict[products][cat][size].append({'name':name,'surface':surface,'thickness':thickness,'path':tile_path,'thumb':thumb_path})
                        else:
                            dict[products][cat][size].append({'name':name,'surface':surface,'thickness':thickness,'path':tile_path})

import json
with open('dir_tree.json', 'w') as file:
    json.dump(dict, file)

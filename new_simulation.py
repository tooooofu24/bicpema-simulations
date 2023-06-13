# import os
# dir = ["spring", "light-synthesis", "lens", "bound-wave","air-resistance"]

# for i in range(len(dir)):
#     path = '/Users/minohirofumi/Develop/bicpema-simulations/public/simulations/'+dir[i]
#     os.mkdir(path)
#     html_path = path + "/index.html"
#     html_file = open(html_path,'w')
#     html_file.write("")
#     html_file.close()
#     path = path + "/js"
#     os.mkdir(path)
#     js_path = path + "/index.js"
#     js_file = open(js_path,'w')
#     js_file.write("")
#     js_file.close()
#     print(i)
    
    
# import os

# path = "public/simulations"

# files = os.listdir(path)
# for file in files:
#     print(file)

import shutil
create_simulation = input("新しくシミュレーションを作成しますか？（y/n）")
if create_simulation:
    folder_name = input("作成するシミュレーションの名前を入力してください：")
    template_folder = 'public/assets/template'
    folder_name = 'public/simulations/'+folder_name
    shutil.copytree(template_folder , folder_name)
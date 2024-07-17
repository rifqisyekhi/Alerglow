# coding=utf-8
import os
import numpy as np
from keras.models import load_model
from keras.utils import img_to_array, load_img
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import re

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'images'  # Folder to store uploaded images
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

MODEL_PATH = 'model.h5'

def rename_layers(model):
    for layer in model.layers:
        layer._name = re.sub(r'[^a-zA-Z0-9]', '_', layer.name)
    return model

def load_and_rename_model(model_path):
    model = load_model(model_path)
    model = rename_layers(model)
    model.save(model_path)

load_and_rename_model(MODEL_PATH)

model = load_model(MODEL_PATH)

def model_predict(img_path, model):
    img = load_img(img_path, target_size=(150, 150))
    x = img_to_array(img)
    x = np.expand_dims(x, axis=0)

    preds = model.predict(x)
    preds = np.argmax(preds, axis=1)
    if preds == 0:
        preds = """
        <div>
        <h1 class="text-xl font-bold text-center text-blue">Hasil Prediksi :</h1>
            <h2 class="text-2xl font-bold"> Cacar Air</h2>
            <h5 class="text-center text-md font-semibold mt-2">Cara Mengatasi Cacar Air :</h5>
            <ul class="list-disc list-inside mt-2">
                <li class="text-center mt-1">
                    - Konsumsi obat penghilang rasa sakit untuk membantu mengurangi 
                    <br> demam tinggi dan rasa sakit ketika seseorang menderita cacar air.
                </li>
                <li class="text-center mt-1">
                    - Minum banyak cairan untuk mencegah dehidrasi,yang dapat menjadi komplikasi cacar air.
                </li>
                <li class="text-center mt-1">- Hindari makanan asin atau pedas</li>
                <li class="text-center mt-1">
                    - Untuk menghindari gatal bisa menjadi parah, dengan memakai salep.
                </li>
                <li class="text-center mt-1">- Jangan menggaruk luka dan menjaga kuku tetap bersih</li>
            </ul>
        </div>
        """
    elif preds == 1:
        preds = """
        <div>
         <h1 class="text-xl font-bold text-center text-blue">Hasil Prediksi :</h1>
            <h2 class="text-2xl text-center font-bold"> Herpes</h2>
            <h5 class="text-center text-lg font-semibold mt-2">Cara Mengatasi Herpes :</h5>
            <ul class="list list-disc list-inside pl-5 space-y-1">
                <li class="text-center mt-1">
                    - Kompres menggunakan air hangat atau dingin pada bagian yang 
                    <br> sering muncul herpes untuk meredakan rasa sakit
                </li>
                <li class="text-center mt-1">
                    - Aplikasikan tumbukan halus bawang putih dan minyak zaitun 
                    <br> pada bagian tubuh yang terdampak virus herpes tiga kali sehari 
                </li>
                <li class="text-center mt-1">
                    - Oleskan Cuka Apel ke bagian tubuh yang terdampak virus. 
                    <br> Cuka apel memiliki komponen anti inflamasi yang bisa membuat luka cepat kering
                </li>
                <li class="text-center mt-1">
                    - Mengonsumsi suplemen seperti yogurt, vitamin B dan zinc dengan 
                    <br> takaran 30 mg per hari untuk mengatasi penyebaran virus 
                </li>
                <li class="text-center mt-1">- Mengatur pola makan yang baik untuk mencegah penurunan daya tahan tubuh</li>
            </ul>
        </div>
        """
    elif preds == 2:
        preds = """
        <div>
        <h1 class="text-xl font-bold text-center text-blue">Hasil Prediksi :</h1>
            <h2 class="text-2xl font-bold text-center"> Impetigo</h2>
            <h5 class="text-center text-lg font-semibold mt-2">Cara Mengatasi Impetigo :</h5>
            <ul class="list list-disc list-inside pl-5 space-y-1">
                <li class="text-center mt-1">- Merendam luka dengan menggunakan air hangat</li>
                <li class="text-center mt-1">- Gunakan salep atau krim antibiotik</li>
                <li class="text-center mt-1">- Meminum obat seperti clindamycin atau obat antibiotik golongan sefalosporin</li>
            </ul>
        </div>
        """
    elif preds == 3:
        preds = """
        <div>
            <h1 class="text-xl font-bold text-center text-blue">Hasil Prediksi :</h1>
            <h2 class="text-2xl text-center font-bold"> Kurap</h2>
            <h5 class="text-center text-lg font-semibold mt-2">Cara Mengatasi Kurap :</h5>
            <ul class="list list-disc list-inside pl-5 space-y-1">
                <li class="text-center mt-1">- Cuci sprei dan pakaian setiap hari untuk membantu membunuh jamur-jamur</li>
                <li class="text-center mt-1">- Keringkan area tubuh secara menyeluruh setelah mandi</li>
                <li class="text-center mt-1">- Gunakan pakaian longgar di daerah yang terkena kurap</li>
                <li class="text-center mt-1">
                    - Obati semua area yang terinfeksi dengan produk yang mengandung 
                    <br> clotrimazole, miconazole, terbinafine, atau bahan terkait lainnya
                </li>
            </ul>
        </div>
        """
    elif preds == 4:
        preds = """
        <div>
            <h1 class="text-xl font-bold text-center text-blue">Hasil Prediksi :</h1>
            <h2 class="text-2xl font-bold text-center"> Kutil</h2>
            <h5 class="text-center text-lg font-semibold mt-2">Cara Mengatasi Kutil :</h5>
            <ul class="list list-disc list-inside pl-5 space-y-1">
                <li class="text-center mt-1">- Perawatan dengan nitrogen cair/cryotherapy</li>
                <li class="text-center mt-1">- Operasi pembedahan</li>
                <li class="text-center mt-1">- Perawatan laser</li>
            </ul>
        </div>
        """
    elif preds == 5:
        preds = """
        <div>
            <h1 class="text-xl font-bold text-center text-blue">Hasil Prediksi :</h1>
            <h2 class="text-2xl font-bold text-center"> Melanoma</h2>
            <h5 class="text-center text-lg font-semibold mt-2">Cara Mengatasi Melanoma :</h5>
            <ul type= class="list list-disc list-inside pl-5 space-y-1">
                <li class="text-center mt-1">- Operasi atau pembedahan jadi pengobatan</li>
                <li class="text-center mt-1">T- erapi radiasi</li>
                <li class="text-center mt-1">- Kemoterapi</li>
            </ul>
        </div>
        """
    elif preds == 6:
        preds = """
        <div>
        <h1 class="text-xl font-bold text-center text-blue">Hasil Prediksi :</h1>
            <h2 class="text-2xl text-center font-bold"> Psoriasis</h2>
            <h5 class="text-center text-lg font-semibold mt-2">Cara Mengatasi Psoriasis :</h5>
            <ul class="list list-disc list-inside pl-5 space-y-1">
                <li class="text-center mt-1">Mengenal dan menjauhi faktor pemicu gejala psoriasis</li>
                <li class="text-center mt-1">- Membatasi waktu mandi</li>
                <li class="text-center mt-1">- Mengoleskan pelembap pada kulit</li>
                <li class="text-center mt-1">- Menjalani pola makan sehat</li>
                <li class="text-center mt-1">- Mengelola stres dengan baik</li>
                <li class="text-center mt-1">- Menggunakan bahan alami</li>
            </ul>
        </div>
        """
    elif preds == 7:
        preds = """
        <div>
        <h1 class="text-xl font-bold text-center text-blue">Hasil Prediksi :</h1>
            <h2 class="text-2xl text-center font-bold"> Vitiligo</h2>
            <h5 class="text-center text-lg font-semibold mt-2">Cara Mengatasi Vitiligo :</h5>
            <ul class="list list-disc list-inside pl-5 space-y-1">
                <li class="text-center mt-1">- Obat yang mengontrol peradangan.</li>
                <li class="text-center mt-1">- Pengobatan yang mempengaruhi sistem kekebalan.</li>
                <li class="text-center mt-1">- Terapi cahaya seperti Fototerapi dengan ultraviolet B pita sempit (UVB)</li>
                <li class="text-center mt-1">- Operasi Cangkok kulit.</li>
                <li class="text-center mt-1">- Transplantasi suspensi seluler.</li>
            </ul>
        </div>
        """
    return preds


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    result = model_predict(file_path, model)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8090)

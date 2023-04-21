from django.shortcuts import render #Rendering the pages
from django.http import HttpResponse, JsonResponse #Returning data to pages
from main.models import database
from django.core.files.storage import FileSystemStorage #Storing file in folder
from tensorflow.keras.models import load_model #loading saved model
from tensorflow.keras import backend as K #for the callbacks (graph purpose)
from tensorflow.keras.models import Sequential #creating models
from tensorflow.keras import optimizers
from tensorflow.keras.layers import LSTM, Dense, SimpleRNN, Conv1D, Conv2D, GRU, Flatten, Dropout
from tensorflow.keras.callbacks import CSVLogger #for graph purpose logs the loss and valloss in csv file
import numpy as np
import csv
import os #to delete file after use
import time


# Define function to get optimizer based on user input
def getOptimizer(mo, mlr, mm=None):
    if mo == 'sgd':
        return optimizers.SGD(lr=mlr, momentum=mm)
    if mo == 'adam':
        return optimizers.Adam(lr=mlr)
    if mo == 'rmsprop':
        return optimizers.RMSprop(lr=mlr)
    if mo == 'adadelta':
        return optimizers.Adadelta(lr=mlr)
    if mo == 'adamax':
        return optimizers.Adamax(lr=mlr)
    if mo == 'adagrad': 
        return optimizers.Adagrad(lr=mlr)
    if mo == 'nadam':
        return optimizers.Nadam(lr=mlr)


# Define function to get neural network model based on user input
def getModel(request):
    # Define folder to store dataset and logs
    folder='main/dataset'

    # Check if user uploaded dataset
    if "data_form" in request.POST:
        if request.method == 'POST' and request.FILES['myfile']:# getting file and then storing into folder
            myfile = request.FILES['myfile']
            fs = FileSystemStorage(location=folder) # defaults to   MEDIA_ROOT  
            filename = fs.save('dataset.npz', myfile)
            file_url = fs.url(filename)
    
    # Check if user submitted neural network architecture       
    if "model_form" in request.POST:
        # Load dataset from saved file
        with np.load('main/dataset/dataset.npz') as data_npz: # Breaking dataset into test and train
            x_train = data_npz['x_train'] # (20000, 784)
            x_test = data_npz['x_test'] # (3000, 784)
            y_test = data_npz['y_test'] # (3000, 10)
            y_train = data_npz['y_train'] # (20000, 10)

        # Remove already present dataset file
        if os.path.exists("main/dataset/dataset.npz"): # deleting the dataset as the data is saved into an arrays
            os.remove("main/dataset/dataset.npz")

        # Set up CSV logger to record training progress
        csv_logger = CSVLogger('main/logs/log.csv', append=True, separator=',')

        # Initialize empty list to store model layers as strings
        stringlist = []

        # Initialize number of layers
        i = 1

        t = 'True'

        # Generating models as user submits the forms
        # All below are the cases to add layers
        # Initialize Sequential model
        model = Sequential()

        # Get input shape of first layer
        lix = request.POST.get('inputlx')
        # Get input shape of second if it exists
        if request.POST.get('inputly') != None:
            liy = request.POST.get('inputly')
        # Get input shape of third if it exists
        if request.POST.get('inputlz') != None:
            liz = request.POST.get('inputlz')

        # Loop through all layers specified by user
        while(request.POST.get('ltype'+str(i)) != None):
            lu = int(request.POST.get('lunits'+str(i)))
            la = request.POST.get('lactivation'+str(i))
            lb = request.POST.get('lbias'+str(i))

            # check if layer should return sequence
            if request.POST.get('lreturnsequence'+str(i)) != None:
                lrs = request.POST.get('lreturnsequence'+str(i))

            # add layer based on layer type specified in POST request
            if request.POST.get('ltype'+str(i)) == 'Dense':
                if i==1:
                    inp_shp = int(lix)
                    model.add(Dense(lu, input_dim=inp_shp, activation=la, bias_initializer=lb))
                else:
                    model.add(Dense(lu, activation=la, bias_initializer=lb))

            if request.POST.get('ltype'+str(i)) == 'LSTM':
                if i==1:
                    inp_shp = (int(lix), int(liy))
                    model.add(LSTM(lu, input_shape=inp_shp, activation=la, bias_initializer=lb, return_sequences=bool(t==lrs)))
                else:
                    model.add(LSTM(lu, activation=la, bias_initializer=lb, return_sequences=bool(t==lrs)))

            if request.POST.get('ltype'+str(i)) == 'GRU':
                if i==1:
                    inp_shp = (int(lix), int(liy))
                    model.add(GRU(lu, input_shape=inp_shp, activation=la, bias_initializer=lb, return_sequences=bool(t==lrs)))
                else:
                    model.add(GRU(lu, activation=la, bias_initializer=lb, return_sequences=bool(t==lrs)))

            if request.POST.get('ltype'+str(i)) == 'SimpleRNN':
                if i==1:
                    inp_shp = (int(lix), int(liy))
                    model.add(SimpleRNN(lu, input_shape=inp_shp, activation=la, bias_initializer=lb, return_sequences=bool(t==lrs)))
                else:
                    model.add(SimpleRNN(lu, activation=la, bias_initializer=lb, return_sequences=bool(t==lrs)))

            if request.POST.get('ltype'+str(i)) == 'Conv1D':
                 # kernal: size of filter mask
                lk = int(request.POST.get('lkernal'+str(i)))
                if i==1:
                    inp_shp = (int(lix), int(liy))
                    model.add(Conv1D(lu, input_shape=inp_shp, kernel_size=lk, activation=la, bias_initializer=lb))
                else:
                    model.add(Conv1D(lu, kernel_size=lk, activation=la, bias_initializer=lb))

            if request.POST.get('ltype'+str(i)) == 'Conv2D':
                 # kernal: width and height of filter mask
                lkx = int(request.POST.get('lkernalx'+str(i)))
                lky = int(request.POST.get('lkernaly'+str(i)))
                if i==1:
                    inp_shp = (int(lix), int(liy), int(liz))
                    model.add(Conv2D(lu, input_shape=inp_shp, kernel_size=(lkx, lky), activation=la, bias_initializer=lb))
                else:
                    model.add(Conv2D(lu, kernel_size=(lkx, lky), activation=la, bias_initializer=lb))

             # dropout not 0
            if round(float(request.POST.get('ldropout'+str(i))), 2) != 0.00:
                model.add(Dropout(round(float(request.POST.get('ldropout'+str(i), 2)))))
            # flatten not none
            if request.POST.get('lflatten'+str(i)) == 'True':
                model.add(Flatten())

            # increment layer
            i = i + 1

        luo = int(request.POST.get('lunits0'))
        lao = request.POST.get('lactivation0')
        lbo = request.POST.get('lbias0')
        if i==1:
            inp_shp = int(lix)
            model.add(Dense(luo, input_dim=inp_shp, activation=lao, bias_initializer=lbo))
        else:
            model.add(Dense(luo, activation=lao, bias_initializer=lbo))

        ml = request.POST.get('modelloss')
        mo = request.POST.get('modeloptimizer')
        ep = int(request.POST.get('noepochs'))
        mlr = round(float(request.POST.get('modellr')), 4)

        if mo=='sgd':
            mm = round(float(request.POST.get('momentum')), 2)
            model.compile(loss=ml, optimizer=getOptimizer(mo, mlr, mm))
        else:
            model.compile(loss=ml, optimizer=getOptimizer(mo, mlr), metrics=['accuracy'])

        model.fit(x_train, y_train, epochs=ep, validation_data=(x_test, y_test), callbacks=[csv_logger], verbose=1) # fitting model inshort training

        if os.path.exists("main/static/models/model.h5"): # deleting the dataset as the data is saved into an arrays
            os.remove("main/static/models/model.h5")

        # Save to download after training   
        model.save('main/static/models/model.h5')

        # model.summary(print_fn=lambda x: stringlist.append(x))

        with open('main/logs/log.csv', 'a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([-1,-1,-1,-1,-1])

        time.sleep(10)

        #clearning session to delete all cache
        K.clear_session()
        # os.remove('F:/webapp/main/logs/log.csv')
    else:
        return render(request, 'main/base.html')

    return render(request, 'main/base.html')


# This function defines a view for live updation of loss val_loss graph
def live_graph(request):
    # Check if the request was made via AJAX
    if request.is_ajax():
        data = {}
        # If it was, read the last row of a CSV file and extract the values of the 'loss', 'epoch', and 'val_loss' columns.
        with open('main/logs/log.csv', 'r') as f:
            row = list(csv.reader(f))
            data ={ 'loss':row[len(row)-2][2], 'epoch':row[len(row)-2][0], 'val_loss':row[len(row)-2][4] }
        # Return the extracted data as a JSON response.
        return JsonResponse(data)


# This function defines a view of home page
def home_page(request):
    return render(request, 'main/home.html')
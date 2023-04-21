from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import numpy as np
import re
from tensorflow.keras.utils import plot_model

model = Sequential()

def getLSTM_model2(num_layers, keep_prob, num_neurons, time_steps):
	model.add(LSTM(num_neurons[0], input_shape=(time_steps,1)))
	for i in range(1, num_layers-1):
		model.add(LSTM(num_neurons[i], return_sequences = True))
		if keep_prob != 0:
			model.add(Dropout(keep_prob))
	model.add(Dense(1))
	model.compile(optimizer='adam',loss='mse')
	stringlist = []
	model.summary(print_fn=lambda x: stringlist.append(x))
	return stringlist

def train_model(input_data, column_name, time_steps, no_epochs):
	data = data[column_name]
	data = np.array([float(re.sub("[^\d\.]", "", data[i-1])) for i in range(len(data), 0, -1)])

	data = data.reshape(data.shape[0], 1)
	scl = MinMaxScaler()
	data = scl.fit_transform(data)

	temp_x = []
	temp_y = []

	for i in range(time_steps, len(data)):
		temp_x.append(data[i - time_steps:i, 0])
		temp_y.append(data[i, 0])

	temp_x = np.array(temp_x)
	temp_y = np.array(temp_y)

	x_train, y_train = temp_x[:int(temp_x.shape[0]*0.7)], temp_y[:int(temp_y.shape[0]*0.7)]

	x_test, y_test = temp_x[int(temp_x.shape[0]*0.7):], temp_y[int(temp_y.shape[0]*0.7):]

	x_train = x_train.reshape((x_train.shape[0], x_train.shape[1], 1))
	x_test = x_test.reshape((x_test.shape[0], x_test.shape[1], 1))

	history = model.fit(x_train, y_train, epochs=no_epochs, validation_data=(x_test,y_test), shuffle=False)

	return history




	def get_model():
		model = Sequential()

		if(lt == Dense):
			model.add(Dense(lu, ))









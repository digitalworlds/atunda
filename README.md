# atunda-data-upload

How to setup project for development. This project relies on the python venv module for creating a virtual environment for dependencies. After cloning the repository, run the following command in the atunda-data-upload directory to inititalize the python virtual environment. 

```shell
python -m venv .
```

This should create various directories in the root of the project. Make sure that these directories are specified in the .gitignore template, as they are unique to each computer. To activate the virtual environment run the following command: 

```shell
./Scripts/activate
```

Note that for macOS, the command is different:

```shell
source bin/activate
```

This should start your virtual environment for Python. After starting the virtual environment, download all project dependencies through pip using: 

```shell
pip install -r requirements.txt
```

Now all python dependencies should be properly installed for the project. For development, make sure to enter the virtual environment. To install all of the react dependencies cd to the frontend directory. From the root directory the command is: 

```
cd atunda/frontend
```

To install all react dependencies run the following command in the frontend directory: 

```
npm install
```

Once all dependencies are install, configurations are made for development. To run the Django server, from the atunda directory run:

```
python manage.py runserver
```

To run the react server, from the frontend directory run: 

```
npm start
```

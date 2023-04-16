# Use the official MySQL image as the base image
FROM mysql:8.0

WORKDIR /app
COPY . . 
# Set the root password and create a new user and database
ENV MYSQL_ROOT_PASSWORD=mysecretpassword
# ENV MYSQL_USER=myuser
# ENV MYSQL_PASSWORD=mypassword


# Copy the custom configuration file to the container
# COPY my.cnf /etc/mysql/conf.d/

# Expose the MySQL port to the outside world
EXPOSE 3306

# Set the default command to run when a container is started
# CMD ["mysqld"]

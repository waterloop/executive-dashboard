# Var definitions.

# Using node 16
FROM node:16-slim 

# Change timezone of container from UTC to EST
RUN rm -rf /etc/localtime
RUN ln -s /usr/share/zoneinfo/America/New_York /etc/localtime

EXPOSE 9001

CMD ["bash"]

#!/bin/bash
#echo KEYCLOAK_URI=$KEYCLOAK_URL
#echo KEYCLOAK_REALN=$KEYCLOAK_REALM
#sed -i 's@ENV_KEYCLOAK_URL@'"$KEYCLOAK_URL"'@g' /usr/share/nginx/html/static/js/main.*.js
#sed -i 's@ENV_KEYCLOAK_REALM@'"$KEYCLOAK_REALM"'@g' /usr/share/nginx/html/static/js/main.*.js
#sed -i 's@ENV_KEYCLOAK_CLIENT_ID@'"$KEYCLOAK_CLIENT_ID"'@g' /usr/share/nginx/html/static/js/main.*.js
#sed -i 's@ENV_BACKEND_URL@'"$BACKEND_URL"'@g' /usr/share/nginx/html/static/js/main.*.js
#sed -i 's@ENV_HOME_URL@'"$HOME_URL"'@g' /usr/share/nginx/html/static/js/main.*.js
chmod -R 755 /usr/share/nginx/html/
nginx -g "daemon off;"

# https://ram.k0a1a.net/self-signed_https_cert_after_chrome_58

# - Create CA key and cert

openssl genrsa -out server_rootCA.key 2048
openssl req -x509 -new -nodes -key server_rootCA.key -sha256 -days 3650 -out server_rootCA.pem


# - Create server_rootCA.csr.cnf

# - server_rootCA.csr.cnf
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn

[dn]
C=DE
ST=Berlin
L=NeuKoelln
O=Weisestrasse
OU=local_RootCA
emailAddress=ikke@server.berlin
CN = server.berlin


# - Create v3.ext configuration file

# v3.ext
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = server.berlin

# - Create server key

openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat server_rootCA.csr.cnf )
openssl x509 -req -in server.csr -CA server_rootCA.pem -CAkey server_rootCA.key -CAcreateserial -out server.crt -days 3650 -sha256 -extfile v3.ext

# - Add cert to the browser

Chromium -> Setting -> (Advanced) Manage Certificates -> Import -> 'server_rootCA.pem'

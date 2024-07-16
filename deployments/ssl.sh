# CA
openssl genpkey -algorithm RSA -out ca.key
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt -subj "/CN=My CA"

# Server
openssl genpkey -algorithm RSA -out server.key
openssl req -new -key server.key -out server.csr -config openssl.cnf

# Sign
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 36500 -sha256 -extfile openssl.cnf -extensions v3_ext


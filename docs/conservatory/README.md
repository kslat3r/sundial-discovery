`docker run --rm -p 8080:80  --name window -v `pwd`:/usr/share/nginx/html:ro  nginx`
`gsutil rsync -r -x ".git*"  . gs://sundial-window/sundial-window`

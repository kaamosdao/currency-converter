install:
	npm install

dev:
	npx cross-env NODE_ENV=development webpack --mode development

build:
	npx cross-env NODE_ENV=production webpack --mode production

serve:
	npx cross-env NODE_ENV=development webpack serve --mode development --open

lint:
	npx eslint . --ext ts,tsx

push:
	git add .
	git commit -m "$(ARGS)"
	git push

docker-build:
	docker-build:
	docker build -t kaamosdao/converter .

docker-run:
	docker run -d -p 4242:4242 --rm --name todoapp kaamosdao/converter

test:
	npm run test

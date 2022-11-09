# Currency Converter
[![E2E Tests](https://github.com/kaamosdao/currency-converter/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/kaamosdao/currency-converter/actions/workflows/e2e-test.yml)
[![Linting](https://github.com/kaamosdao/currency-converter/actions/workflows/linter-check.yml/badge.svg)](https://github.com/kaamosdao/currency-converter/actions/workflows/linter-check.yml)
[![Unit test](https://github.com/kaamosdao/currency-converter/actions/workflows/unit-test.yml/badge.svg)](https://github.com/kaamosdao/currency-converter/actions/workflows/unit-test.yml)

SPA for converting currency.

Server may response with error, status 429. That mean client ran out of free monthly requests limit.

This project is the solution to this test task: 
[Тестовое задание на вакансию "Frontend Developer"](https://github.com/appbooster/test-assignments/blob/master/tasks/frontend.md)

#
## Install

```sh
$ make install
```

## Start app 
####  *(open http://localhost:4242)*
```
$ make serve
```
```
or using docker:
$ make docker-build
$ make docker-run
```

#!/bin/sh

nodemon $* | bunyan -o short -l debug

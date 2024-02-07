#
# Simple Makefile for GCC/Linux
#

.DEFAULT: default

OBJS=JDebug.o JDiff.o JPatcht.o JDefs.o JHashPos.o JMatchTable.o JFileOut.o JFile.o \
     JFileAhead.o JFileAheadStdio.o JFileAheadIStream.o JOutAsc.o JOutBin.o JOutRgn.o main.o 

default:	64
all: 		64 
full:		clean 64
native:		jdiff
64:			jdiff 
debug:		jdifd 

CC=gcc
CPP=g++
CFLAGS=$(NATIVE) -O2 -Wall

debug:DBG=-g -D_DEBUG
native:CFLAGS=$(CFLAGS) -march=native
64:CFLAGS+= -s -m64 -D_LARGEFILE64_SOURCE -D_FILE_OFFSET_BITS=64

%.o: %.cpp
	$(CPP) $(CFLAGS) $(DBG) -o $@ -c $<

clean:
	rm -f jdiff jpatch jdifd jptcd *.exe $(OBJS)

jdiff: $(OBJS)
	$(CPP) $(CFLAGS) $(DBG) $(OBJS) -o jdiff

jpatch: jpatch.cpp
	$(CPP) $(CFLAGS) $(DBG) -o jpatch jpatch.cpp

jdifd: $(OBJS)
	$(CPP) $(CFLAGS) $(DBG) $(OBJS) -o jdifd

jpatcd: jpatch.cpp
	$(CPP) $(CFLAGS) $(DBG) -o jptcd jpatch.cpp



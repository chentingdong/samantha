#!/bin/bash
# lock-session.sh
CREATE=false
REMOVE=false
while getopts ":crt:l:w:" opt; do
  case ${opt} in
    c )
      CREATE=true
      ;;
    r ) # process option t
      REMOVE=true
      ;;
    t )
      MAXTRIES=$OPTARG
      ;;
    l )
      LOCKFILE=$OPTARG
      ;;
    w )
      FILETEXT=$OPTARG
      ;;
    \? ) echo "Usage: cmd [-c] [-r] [-t tries] [-l lockfile] [-w text in file]"
      ;;
  esac
done

if [ -z $LOCKFILE ]; then
  LOCKFILE=tests/nightwatch/autotestlock.txt
fi

if [ -z $FILETEXT ]; then
  FILETEXT=`date`
fi

if [ $CREATE = true ]; then
  if [ -e $LOCKFILE ]; then
    echo "A session already has lock on ${LOCKFILE}. Waiting ..."
    i=1
    if [ -z $MAXTRIES ]; then
      echo "Defaulting to 40 tries."
      MAXTRIES=40
    fi
    while [ -e $LOCKFILE ] && [ $i -lt $MAXTRIES ]
    do
      echo "Waiting for ${LOCKFILE} to free up. ${i} of ${MAXTRIES}"
      ((i++))
      sleep 5
    done
    if [ -e $LOCKFILE ]; then
      echo "Timed out waiting for ${LOCKFILE}"
      exit 1
    else
      echo "${LOCKFILE} free after ${i} tries. Creating now"
      echo $FILETEXT > $LOCKFILE
    fi
  else
    echo "Creating lock file: ${LOCKFILE}"
    echo $FILETEXT > $LOCKFILE
  fi

elif [ $REMOVE = true ]; then
  echo "Removing lock file: ${LOCKFILE}"
  rm -f $LOCKFILE
fi
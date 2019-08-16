#!/usr/bin/env /usr/local/bin/node

const fs = require('fs')
const { exec } = require('child_process');

let connection = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I'
let getCurrentLocation = 'networksetup -getcurrentlocation'
let switchToLocation = 'networksetup -switchtolocation'
let listLocations = 'networksetup -listlocations'

//get current SSID
let SSID = new Promise((resolve, reject) => {
  exec(connection, (err, response, stderr) => {
    if (stderr || err !== null) {
      console.log(':poop:')
      console.log('---')
      console.log(`can't get SSID`)
      reject()
    }
    currentSSID = /\sSSID:(.*)/gm.exec(response)
    currentSSID = currentSSID[1].trim()
    resolve(currentSSID)
  })
})

//get current network location
let location = new Promise((resolve, reject) => {
  exec(getCurrentLocation, (err, response, stderr) => {
    if (stderr || err !== null) {
      console.log(':poop:')
      console.log('---')
      console.log(`can't get location`)
      reject()
    }
    resolve(response.trim())
  })
})

//get list of all locations
let allLocations = new Promise((resolve, reject) => {
  exec(listLocations, (err, response, stderr) => {
    if (stderr || err !== null) {
      console.log(':poop:')
      console.log('---')
      console.log(`can't get all locations`)
      reject()
    }
    resolve(response.trim().split('\n'))
  })
})

Promise.all([SSID, location, allLocations]).then((values) => {

  //If current location already same as SSID
  if (values[0] === values[1]) {
    console.log(`:ok_hand:`)
    console.log(`---`)
    console.log(`Location: ${values[0]}`)
    return
  }

  //Default network location
  if (values[1] === 'Automatic') {
    console.log(`:ok_hand:`)
    console.log(`---`)
    console.log('Location: Automatic')
  }

  //If can't find location for SSID set to Automatic (default)
  if (!values[2].includes(values[0])) {
    switchToLocation = `${switchToLocation} Automatic`
  } else {
    switchToLocation = `${switchToLocation} '${values[0]}'`
  }

  //Switch to location
  exec(switchToLocation, (err, response, stderr) => {
    if (stderr || err !== null) {
      console.log(':poop:')
      console.log(`can't switch location`)
    }
    return
  })
})
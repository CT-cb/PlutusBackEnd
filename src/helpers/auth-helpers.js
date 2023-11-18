/**
 * Middleware for the /auth/ endpoint
 */

const express = require('express');
const mongoose = require('mongoose');

let userModel = require("../models/user-model");

/**
 * 
 * @param {Object} obj 
 * @returns 
 */
function hasLoginKeys(obj){
    if (obj == null)
        return false;
    
    return ( !!obj.email && !!obj.password);
}

/**
 * 
 * @param {Object} obj 
 * @returns 
 */
function hasCreateAccountKeys(obj){
    if (obj == null)
        return false;

    return (
        !!obj.email &&
        !!obj.password
    );
}

module.exports = {hasLoginKeys};
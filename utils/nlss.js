/**
 * helper functions for NLSS authentication
 */

import {sha3_256 as hashFu} from 'js-sha3'
 
 
export function createChallengeResponse(challenge,positionCount,privShare) {
    let signature = generateSignature(challenge,positionCount,privShare)
    return signature
 }
 
 
 // --------------- nlss functions ----------------
 
 /**
  * verifies if a signature is signed by the correct signer.
  * using the signers did and public share
  * @param {string} hash - hex hash
  * @param {number} positionCount - number of position to use (usually 32)
  * @param {number[]} signature - array of 1 & 0 with length = positionCount * 8
  * @param {Uint8Array} didShare - did image bytes
  * @param {*} publicShare - public share image bytes 
  * @returns {Boolean} - true when the signature is correct false otherwise
  */
  function verifySignature(hash,positionCount,signature,didShare,publicShare) {
    let [originalPosition,signPosition] = randomPosition("verify", hash, positionCount, signature);
 
     // from public share
     let senderWalletID = []
     for(let pos of signPosition)
         senderWalletID.push(getShareBinDigit(publicShare,pos))
 
     // from did share
     let decentralizedIDForAuth = []
     for (let pos of originalPosition) {
         decentralizedIDForAuth.push(getShareBinDigit(didShare,pos>>3))
     }
 
     // combining and reducing signature with publicShare pos
     let recombinedResult = []
     for(let i = 0; i < positionCount*8; i+=8) {
         let sum = 0
         for(let j = i; j < i+8; j++)
             sum += senderWalletID[j] * signature[j]
         recombinedResult.push(sum % 2)
     }
     
     if( decentralizedIDForAuth.join('') === recombinedResult.join('') )
         return true
     else
         return false
 }
 
 /**
  * generate a signature for an hash using private share.
  * @param {string} hash hex hash
  * @param {number} positionCount number of positions to use for signing (usually 32)
  * @param {Uint8Array} pvtShare private share image bytes
  * @returns {number[]} - array of 1 & 0 with length = positionCount * 8
  */
 function generateSignature(hash,positionCount,pvtShare) {
    let [originalPosition,signPosition] = randomPosition('sign',hash,positionCount,pvtShare)
     return getPvtPositions(signPosition,pvtShare)
 }
 
 /**
  * create random positions from hash for signing and verifying
  * @param {string} role - 'sign' or 'verify'
  * @param {string} hash - hex hash
  * @param {number} positionCount - number of position to use (usually 32)
  * @param {Uint8Array|number[]} pvtShare_or_sign - private share(Uint8Array - private share image bytes) when role = 'sign'
  *      - signature(number[] - array of 1&0 with length = positionCount*8) when role = 'verify'
  * @returns {Array.<number[],number[]>} - array with 2 element [originalPosition,signPosition]
  *      both are array of 1&0 while originalPosition has lenght = positionCount and
  *      signPosition has length = positionCount * 8
  */
 function randomPosition(role,hash,positionCount,pvtShare_or_sign) {
     let u = 0, m = 0, l = 0
 
     let signPosition = new Array(positionCount * 8).fill(0)     //java initilizes array with 0
     let originalPosition = new Array(positionCount).fill(0)     //java initilizes array with 0
 
     for(let i = 0; i < positionCount; i++) {
         let hashChar = getNumericValue(hash.charAt(i))
         let detVal = (((2402 + hashChar) * 2709) + ((i + 2709) + hashChar)) % 2048
         
         originalPosition[i] = (detVal >> 3) << 3 // equal to (Math.floor(detVal/8) * 8)
 
         let positionArray = new Array(positionCount).fill(0)  //java initilizes array with 0
         let finalPosition = new Array(8).fill(0)    //java initilizes array with 0
         
         positionArray[i] = originalPosition[i]
         
         l = 0
         for(let p = 0; p < 8; p++) {
             signPosition[u] = positionArray[i]
             finalPosition[l] = positionArray[i]
             positionArray[i]++
             u++
             l++
         }
         if(role == 'sign') {
             let ptSign = getPvtPositions(finalPosition,pvtShare_or_sign)
             hash = hashFu(hash + intArray2Str(originalPosition) + intArray2Str(ptSign))
             //console.log(hash)
         }
         else {
             // original version
             // let p1 = new Array(8);
             // for (let k = 0; k < 8; k++) {
             //     p1[k] = parseInt(pvtShare_or_sign[m])
             //     m++
             // }
             let p1 = pvtShare_or_sign.slice(m,m+8)
             m += 8
             hash = hashFu(hash + intArray2Str(originalPosition) + intArray2Str(p1))
         }
     }
     return [originalPosition,signPosition]
 }
 
 /**
  * mimics java's  `Character.getNumericValue()`
  * character from 0-9 gives number from 0-9
  * character from a-z and A-Z gives number from 10-35
  * or else -1
  * @param {String} ch single character
  * @returns {Number}
  */
 function getNumericValue(ch) {
     let code = ch.charCodeAt(0)
     if(code >= '0'.charCodeAt(0) && code <= '9'.charCodeAt(0) )
         return code - '0'.charCodeAt(0) + 0
     if(code >= 'a'.charCodeAt(0) && code <= 'z'.charCodeAt(0) )
         return code - 'a'.charCodeAt(0) + 10
     if(code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0) )
         return code - 'A'.charCodeAt(0) + 10
     return -1
 }
 
 /**
  * port intArray2Str function in java nlss
  * convert int array to string
  * @param {number} array - array preferably containing only 0 & 1 (but this prgm use other input as well)
  * @returns {String} - a sequence of 1 and 0 as string.
  */
 function intArray2Str(array) {
     // this is no mistake, this mimics java version 
     // of intArray2Str exactly
     return array.map((v) => v == 1 ? "1" : "0").join('')
 }
 
 function getPvtPositions(positions, pvtShare) {
    let privatePosition = new Array(positions.length);
     for (let k = 0; k < positions.length; k++) {
         const a = positions[k];
         const b = getShareBinDigit(pvtShare,a);
         privatePosition[k] = b;
     }
     return privatePosition;
 }
 
 /**
  * gets the bit at given position
  * @param {Uint8Array} pvtShare privateshare
  * @param {number} index bit index
  * @returns {number} 1 or 0 corresponding to the bit at index position
  */
 function getShareBinDigit(pvtShare,index) {
     let q = Math.floor(index/8), r = index%8
     let byte = pvtShare[q]
     if( byte & (0x80>>r) )
         return 1
     else
         return 0
 }
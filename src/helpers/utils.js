import { format } from "date-fns"
import SecureLS from "secure-ls"

export const getItemFromLocalStorage = key => {
  return new SecureLS({ encodingType: "aes" }).get(key)
}

export const setItemOnLocalStorage = (key, value) => {
  new SecureLS({ encodingType: "aes" }).set(key, value)
}

export const removeItemOnLocalStorage = key => {
  new SecureLS({ encodingType: "aes" }).remove(key)
}

export const clearValuesOnLogout = () => {
  new SecureLS({ encodingType: "aes" }).removeAll()
}

export const formatDate = (date, formatStr) => {
  return format(date, formatStr)
}

export const AddOrRemoveClassToElementsByClassName = (
  className,
  classNameToBeAdded,
  classNameToRemoved
) => {
  var elements = document.getElementsByClassName(className)

  for (var e = 0; e < elements.length; e++) {
    if (elements[e] != null) {
      // For each element
      var element = elements[e]
      for (var i = 0; i < classNameToBeAdded.length; i++) {
        element.classList.add(classNameToBeAdded[i])
      }
      for (var j = 0; j < classNameToRemoved.length; j++) {
        element.classList.remove(classNameToRemoved[j])
      }
    }
  }
}

export const AddOrRemoveClassToElementsById = (
  id,
  classNameToBeAdded,
  classNameToRemoved
) => {
  var element = document.getElementById(id)
  if (element != null) {
    for (var i = 0; i < classNameToBeAdded.length; i++) {
      element.classList.add(classNameToBeAdded[i])
    }
    for (var j = 0; j < classNameToRemoved.length; j++) {
      element.classList.remove(classNameToRemoved[j])
    }
  }
}

export const CalculatePercentage = (total, value) => {
  if (!isNaN(total) && !isNaN(value) && total !== 0 && value !== 0) {
    return ((value / total) * 100).toFixed(0)
  } else {
    return parseFloat("0").toFixed(0)
  }
}

export const GetGender = val => {
  if (!val) {
    return ""
  } else {
    if (val.toLowerCase().indexOf("female") > -1) {
      val = "F"
    }
    if (val.toLowerCase().indexOf("male") > -1) {
      val = "M"
    }
    if (val.toLowerCase().indexOf("transgender") > -1) {
      val = "T"
    }
    return Genders.find(x => x.value === val).label
  }
}

export const PadZerosLeft = (num, size) => {
  var s = num + ""
  while (s.length < size) s = "0" + s
  return s
}

export const INVALID_CHARS = [
  `'`,
  `"`,
  `;`,
  `>`,
  `<`,
  `=`,
  `(`,
  `)`,
  `&`,
  `/`,
  `\\`,
]
export const INVALID_CHARS_REGEX = /[`'";><=()&/\\]/gi

export const checkIfImage = url => {
  if (url) {
    if (typeof url === "string") {
      var value = url.split(".")
      var length = value.length
      if (
        value[length - 1].toLowerCase().includes("png") ||
        value[length - 1].toLowerCase().includes("jpg") ||
        value[length - 1].toLowerCase().includes("jpeg")
      )
        return true
      else return false
    } else return false
  } else return false
}

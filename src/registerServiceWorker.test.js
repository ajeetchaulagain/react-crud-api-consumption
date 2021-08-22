const rewire = require("rewire")
const registerServiceWorker = rewire("./registerServiceWorker")
const checkValidServiceWorker = registerServiceWorker.__get__("checkValidServiceWorker")
// @ponicode
describe("registerServiceWorker.default", () => {
    test("0", () => {
        let callFunction = () => {
            registerServiceWorker.default()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("checkValidServiceWorker", () => {
    test("0", () => {
        let callFunction = () => {
            checkValidServiceWorker("https://api.telegram.org/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            checkValidServiceWorker("http://www.croplands.org/account/confirm?t=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            checkValidServiceWorker("www.google.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            checkValidServiceWorker("https://croplands.org/app/a/confirm?t=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            checkValidServiceWorker("https://accounts.google.com/o/oauth2/revoke?token=%s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            checkValidServiceWorker(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("registerServiceWorker.unregister", () => {
    test("0", () => {
        let callFunction = () => {
            registerServiceWorker.unregister()
        }
    
        expect(callFunction).not.toThrow()
    })
})

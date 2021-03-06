var should      = require("should")
var request     = require('request')
var path        = require("path")
var fs          = require("fs")
var exec        = require("child_process").exec
var harp        = require("../");

describe("compile", function(){

  describe("basic app", function(){
    var projectPath = path.join(__dirname, "apps/compile/basic")
    var outputPath  = path.join(__dirname, "out/compile-basic")

    it("should compile", function(done){
      harp.compile(projectPath, outputPath, function(error){
        should.not.exist(error)
        done()
      })
    })

    it("compile should not include folders named with underscores", function(done) {
      var cssOutputPath = path.join(outputPath, "/css")

      var rsp = fs.existsSync(path.join(cssOutputPath, "/_partials/some.css"))
      rsp.should.be.false

      var rsp = fs.existsSync(path.join(cssOutputPath, "/_partials/_more.css"))
      rsp.should.be.false

      done()

    })

    it("compile should not include files named with underscores", function(done) {
      var cssOutputPath = path.join(outputPath, "/css")

      var rsp = fs.existsSync(path.join(cssOutputPath, "/one/two/three/_four.css"))
      rsp.should.be.false

      var rsp = fs.existsSync(path.join(cssOutputPath, "/one/two/three/_five.css"))
      rsp.should.be.false

      var rsp = fs.existsSync(path.join(cssOutputPath, "/_nav.css"))
      rsp.should.be.false

      done()
    })

  })

  after(function(done){
    exec("rm -rf " + path.join(__dirname, "out"), function(){
      done()
    })
  })

})
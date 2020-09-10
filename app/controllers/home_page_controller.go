package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// HomePageController 首页渲染
func HomePageController(c *gin.Context) {
	c.HTML(http.StatusOK, "home/index.tmpl", gin.H{
		"title": "Posts",
	})
}

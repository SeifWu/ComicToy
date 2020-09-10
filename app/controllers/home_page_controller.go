package controller

import (
	"net/http"
	model "seifwu/app/models"
	"seifwu/global"

	"github.com/gin-gonic/gin"
)

// HomePageController 首页渲染
func HomePageController(c *gin.Context) {
	var comics []model.Comic
	var result []struct {
		ID        int    `json:"id"`
		Name      string `json:"name"`
		Introduce string `json:"introduce"`
		Cover     string `json:"cover"`
		Author    string `json:"author"`
	}

	DB := global.DB.Model(&model.Comic{})

	DB = DB.Find(&comics).Scan(&result)

	c.HTML(http.StatusOK, "home/index.tmpl", gin.H{
		"title": "Posts",
		"list":  result,
	})
}

package controller

import (
	"net/http"
	model "seifwu/app/models"
	"seifwu/global"

	"github.com/gin-gonic/gin"
)

// ComicDetailController 漫画详情
func ComicDetailController(c *gin.Context) {
	id := c.Param("id")

	var comic model.Comic
	var result struct {
		ID           int    `json:"id"`
		Name         string `json:"name"`
		Introduce    string `json:"introduce"`
		Cover        string `json:"cover"`
		Author       string `json:"author"`
		ComicChapter []model.ComicChapter
	}

	DB := global.DB.Model(&model.Comic{})

	DB = DB.Find(&comic, id).Related(&result.ComicChapter).Scan(&result)

	if result.ID == 0 {
		c.HTML(http.StatusOK, "error/404.tmpl", gin.H{
			"title": "404",
		})
	} else {
		c.HTML(http.StatusOK, "comics/index.tmpl", gin.H{
			"title": result.Name,
			"data":  result,
		})
	}

}

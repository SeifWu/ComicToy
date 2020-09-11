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

// ComicContentController 漫画详情
func ComicContentController(c *gin.Context) {
	pid := c.Param("id")
	id := c.Param("cid")

	var comicChapter model.ComicChapter
	var previousChapter model.ComicChapter
	var nextChapter model.ComicChapter

	DB := global.DB.Model(&model.ComicChapter{})

	// 上一条
	DB.Where("comic_id = ? AND id < ?", pid, id).Order("id desc").Limit(1).Find(&previousChapter)
	// 下一条
	DB.Where("comic_id = ? AND id > ?", pid, id).Order("id asc").Limit(1).Find(&nextChapter)

	DB = DB.Find(&comicChapter, id).Related(&comicChapter.ComicChapterDetail)

	if comicChapter.ID == 0 {
		c.HTML(http.StatusOK, "error/404.tmpl", gin.H{
			"title": "404",
		})
	} else {
		c.HTML(http.StatusOK, "comics/content.tmpl", gin.H{
			"title":           comicChapter.Name,
			"data":            comicChapter,
			"previousChapter": previousChapter,
			"nextChapter":     nextChapter,
		})
	}
}

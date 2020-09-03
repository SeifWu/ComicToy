package v1publicapi

import (
	"net/http"
	model "seifwu/app/models"
	"seifwu/global"

	"github.com/gin-gonic/gin"
)

func FetchComicList(c *gin.Context) {
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

	c.JSON(
		http.StatusOK,
		gin.H{
			"success": true,
			"data":    result,
		},
	)
}

func FetchComicDetail(c *gin.Context) {
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

	c.JSON(
		http.StatusOK,
		gin.H{
			"success": true,
			"data":    result,
		},
	)
}

func FetchComicContent(c *gin.Context) {
	id := c.Param("id")
	var comicChapter model.ComicChapter

	DB := global.DB.Model(&model.ComicChapter{})

	DB = DB.Find(&comicChapter, id).Related(&comicChapter.ComicChapterDetail)

	c.JSON(
		http.StatusOK,
		gin.H{
			"success": true,
			"data":    comicChapter,
		},
	)

}

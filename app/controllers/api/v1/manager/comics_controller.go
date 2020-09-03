package v1managerapi

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	model "seifwu/app/models"
	"seifwu/global"
	"seifwu/global/response"
	util "seifwu/utils"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gocolly/colly"
	"github.com/gocolly/colly/queue"
)

type CreateComicParams struct {
	URL string `json:"url"`
}

// CreateComic POST
func CreateComic(c *gin.Context) {
	var createComicParams CreateComicParams

	err := c.ShouldBindJSON(&createComicParams)
	if err != nil {
		response.Fail(c, gin.H{"errMsg": "传递参数有误"})
		return
	}

	url := createComicParams.URL

	result := util.ComicLRYApiCrawler(url)

	comic := model.Comic{
		Name:         result.Data.Name,
		Introduce:    result.Data.Introduce,
		Cover:        result.Data.Cover,
		Author:       result.Data.Author,
		ComicChapter: result.List,
	}
	DB := global.DB
	DB.FirstOrCreate(&comic, model.Comic{Name: result.Data.Name})
	go fetchDetail(result.List)

	c.JSON(
		http.StatusOK,
		result,
	)
}

func fetchDetail(list []model.ComicChapter) {
	time.Sleep(10 * time.Second)
	DB := global.DB
	url := "http://47.114.147.221"

	// Instantiate default collector
	c := colly.NewCollector()

	// create a request queue with 2 consumer threads
	q, _ := queue.New(
		2, // Number of consumer threads
		&queue.InMemoryQueueStorage{MaxSize: 10000}, // Use default queue storage
	)

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("visiting", r.URL)
	})

	var result struct {
		List []model.ComicChapterDetail `json:"list"`
	}

	c.OnResponse(func(resp *colly.Response) {
		queryURL := resp.Request.URL.Query().Get("mhurl2")
		err := json.Unmarshal(resp.Body, &result)
		DB.Where("url = ?", queryURL).First(&model.ComicChapter{}).Association("ComicChapterDetail").Append(result.List)

		if err != nil {

			log.Println("failed:", err)
			return
		}
	})

	for _, value := range list {
		q.AddURL(fmt.Sprintf("%s?mhurl2=%s", url, value.URL))
	}

	// Consume URLs
	q.Run(c)

	// return result
}

package util

import (
	"encoding/json"
	"fmt"
	"log"
	"reflect"
	model "seifwu/app/models"

	"github.com/gocolly/colly"
)

type ComicLRYApiStruct struct {
	Data struct {
		Author    string `json:"author"`
		Cover     string `json:"cover"`
		Introduce string `json:"introduce"`
		Name      string `json:"name"`
	} `json:"data"`
	List []model.ComicChapter `json:"list"`
}

// ComicLRYApiCrawler ComicLRYApiCrawler LRY-API 漫画爬虫
func ComicLRYApiCrawler(url string) ComicLRYApiStruct {
	// Instantiate default collector
	c := colly.NewCollector()

	c.OnRequest(func(r *colly.Request) {
		log.Println("Visiting", r.URL)
	})

	var result ComicLRYApiStruct

	c.OnResponse(func(resp *colly.Response) {
		a := reflect.TypeOf(resp.Body)
		fmt.Println(a)
		err := json.Unmarshal(resp.Body, &result)
		if err != nil {

			log.Println("failed:", err)
			return
		}
	})

	c.Visit(url)

	return result
}

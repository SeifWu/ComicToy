package routers

import (
	controller "seifwu/app/controllers"
	v1api "seifwu/app/controllers/api/v1"
	v1managerapi "seifwu/app/controllers/api/v1/manager"
	v1publicapi "seifwu/app/controllers/api/v1/public"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

// Routers 路由
func Routers() *gin.Engine {
	sessionSecretKey := viper.GetString("session.secretKey")

	router := gin.Default()
	router.LoadHTMLGlob("templates/**/*")
	router.Static("/assets", "assets")

	store, _ := redis.NewStoreWithDB(10, "tcp", "localhost:6379", "", "1", []byte(sessionSecretKey))
	store.Options(sessions.Options{Path: "/", MaxAge: 2629746, HttpOnly: true})

	// router.Use(static.Serve("/frontend", static.LocalFile("dist", true)))
	// router.NoRoute(func(c *gin.Context) {
	// 	dir, file := path.Split(c.Request.RequestURI)
	// 	ext := filepath.Ext(file)
	// 	if file == "" || ext == "" {
	// 		c.File("dist/index.html")
	// 	} else {
	// 		// strings.Split(file, "?")
	// 		c.File("dist" + path.Join(dir, file))
	// 	}

	// })

	router.Use(sessions.Sessions("appSession", store))
	router.GET("/", controller.HomePageController)

	v1 := router.Group("/api/v1")
	{
		// 发送邮件
		v1.POST("/send_mail", v1api.SendAuthCodeMailsController)
		// 登录
		v1.POST("/login", v1api.Login)
		// 爬虫 Comic
		v1.POST("/comic", v1managerapi.CreateComic)

		public := v1.Group("/public")
		{
			public.GET("/comic", v1publicapi.FetchComicList)
			public.GET("/comic/:id", v1publicapi.FetchComicDetail)
			public.GET("/comic_chapter/:id", v1publicapi.FetchComicContent)
		}
	}

	UserRoutes(router)

	return router
}

---
title: This is how iuap send the file to the server
tags: ["i-made-thing", "iuap", "code"]
cover: uploadfile.jpg
author: ramber
---

<re-img
    src="uploadfile.jpg"
    title="just a picture"
    >
</re-img>

This code is trying to upload the file to the server.
For example：


> ### IUAP上传文件

```java
String baseUrl = PropertyUtil.getPropertyByKey("base.url");
HashMap<String,String> headers = new HashMap<>();
List<FormBodyPart> formParts = new ArrayList<>();
formParts.add(new FormBodyPart("filepath", new StringBody("helpCenter", ContentType.DEFAULT_TEXT)));
formParts.add(new FormBodyPart("groupname", new StringBody("helpFile", ContentType.DEFAULT_TEXT)));
formParts.add(new FormBodyPart("files[]", new FileBody(new File("C:\\Users\\dynabook\\Desktop\\dns配置地址.txt"),ContentType.DEFAULT_BINARY.getMimeType(),"UTF-8")));
JSONObject jsonObject = RestRequestUtil.processHttpResponse(RestRequestUtil.getHttpContextUtilInstance().multipartPostWithContext(baseUrl+"/iuap-saas-filesystem-service/file/upload", null, formParts, headers));
```
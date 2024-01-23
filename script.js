document.getElementById('fetchStatus').addEventListener('click', function() {
    var serverAddress = document.getElementById('serverAddress').value.trim();
    if (!serverAddress) {
        document.getElementById('response').innerText = "请输入IP或域名";
        return;
    }

    var api_url = `http://api.mcsrvstat.us/3/${serverAddress}`;
    var startTime = Date.now();

    // 更新经过的时间
    function updateElapsedTime() {
        var elapsedTime = (Date.now() - startTime) / 1000;
        document.getElementById('elapsedTime').innerText = `Elapsed time: ${elapsedTime.toFixed(2)} seconds`;
    }

    var intervalId = setInterval(updateElapsedTime, 50);

    // 过滤不需要的数据
    function filterResponseData(responseData) {
        delete responseData['ip'];
        delete responseData['port'];
        delete responseData['debug'];
        return responseData;
    }

    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            // 过滤数据
            const filteredData = filterResponseData(data);
            // 在此处过滤和格式化数据
            document.getElementById('response').innerText = JSON.stringify(filteredData, null, 2);
        })
        .catch(error => {
            document.getElementById('response').innerText = error;
        })
        .finally(() => {
            clearInterval(intervalId); // 停止更新经过的时间
            updateElapsedTime(); // 更新最后一次的时间
        });
});
import { PageLoading } from "./pageLoading.js"

window.addEventListener('pageshow', () => {
    PageLoading.stopLoading();
})
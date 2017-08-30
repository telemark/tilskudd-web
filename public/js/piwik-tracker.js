'use strict'

var idSite = 5
var piwikTrackingApiUrl = 'https://piwik.service.t-fk.no/piwik.php';

var _paq = _paq || []
_paq.push(['setTrackerUrl', piwikTrackingApiUrl])
_paq.push(['setSiteId', idSite])
_paq.push(['trackPageView'])
_paq.push(['enableLinkTracking'])
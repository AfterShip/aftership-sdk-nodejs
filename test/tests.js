/******************************************
 * Set your API key here for testing
 ******************************************/
GLOBAL.apiKey = '';

/******************************************
 * Set tracking numbers here
 ******************************************/

GLOBAL.tracking = {
  '4px': 'S0161579',
  'abf': '023471187',
  'aeroflash': '0000059S44077052000',
  'aramex': '7865103750',
  'australia-post': '60602175829091',
  'austrian-post': '1020961000000270140203',
  'bluedart': '13953569151',
  'bpost': 'CD097118257BE',
  'brazil-correios': 'RT184013321HK',
  'canada-post': 'CX152462363CA',
  'ceska-posta': 'CV018141675CZ',
  'china-ems': 'LN090239352CN',
  'china-post': 'RB638463168CN',
  'chronopost-france': 'EQ028187141AU',
  'chronopost-portugal': '09667479000266Y',
  'city-link': 'DA504809',
  'correos-de-mexico': 'EE793254021MX',
  'danmark-post': '00257059831510850052',
  'deutsch-post': 'RG363876914DE:08:26:13',
  'dhl': '4681442382',
  'dhl-benelux': 'JJD00009005823414004051',
  'dhl-germany': '320515158241',
  'dhl-global-mail': 'GM5451139750618182',
  'dhl-nl': 'JJD00009005770854017849',
  'dpd': '05167016980292',
  'dpd-poland': '0002580014936B',
  'dpd-uk': '15505994344183',
  'elta-courier': 'NZ990003254GR',
  'estafeta': '1026089369',
  'estes': '4046642666',
  'fedex': '573191403485',
  'fedex-uk': '03816601670',
  'flash-courier': '00723116936',
  'gls': '90295251672',
  'hermes': '5853112039365278',
  'hermes-de': '09222115000091',
  'hong-kong-post': 'RC878817187HK',
  'india-post': 'RN183856723IN',
  'india-post-int': 'ED246019595IN',
  'interlink-express': '15976924334370J',
  'international-seur': '6551632',
  'israel-post': 'RR295541738IL',
  'italy-sda': '2830014087448',
  'kn': 'NTG268611689',
  'korea-post': 'RR917455677KR',
  'la-poste-colissimo': 'LE027260494FR',
  'lasership': 'LH14644596',
  'malaysia-post': 'EM300414561MY',
  'malaysia-post-posdaftar': 'RR148168665MY',
  'mexico-multipack': '153600381098',
  'mrw-spain': '23000342398',
  'nacex-spain': '10223334:2844',
  'new-zealand-post': 'RR009956924NZ',
  'nova-poshta': '59000022462893',
  'oca-ar': 'QAA14251930',
  'ontrac': 'D10010608010453',
  'parcel-force': 'PBNS2194803001',
  'poczta-polska': 'CP146871488PL',
  'portugal-ctt': 'CP016017542PT',
  'portugal-seur': 'AUF-L-2090240',
  'poste-italiane': 'RT183645021HK',
  'poste-italiane-paccocelere': 'ZA123456789IT',
  'postnl': '3SRPPB1644664:4900HA',
  'ptt-posta': 'RR182174944TR',
  'red-express': '00251249',
  'rl-carriers': '051650091',
  'royal-mail': 'KF392852901GB',
  'russian-post': 'VA008900172RU',
  'sapo': 'CN030672518ZA',
  'saudi-post': 'EH001512027SA',
  'selektvracht': '3SXLDW00387',
  'sf-express': '029197190059',
  'singapore-post': 'RQ026259720SG',
  'singapore-speedpost': 'EM800039184SG',
  'siodemka': '8230007484998',
  'skynet': '238020661126',
  'spain-correos-es': 'RR453455234ES',
  'star-track': '2NX22459',
  'swiss-post': 'RY009748935CH',
  'taiwan-post': 'RA097277029TW',
  'taqbin-hk': '120012597110',
  'taqbin-sg': '120019135121',
  'thailand-post': 'RR073570309TH',
  'tnt': '880280693',
  'toll-global-express': '813081390262',
  'uk-mail': '31038770035059',
  'ukrposhta': 'RA491880118UA',
  'ups': '1Z86392WYW91844988',
  'ups-freight': '526284382',
  'ups-mi': '92748901100613553000137292',
  'usps': '9449010200828835620973',
  'yrc': '2754478706'
};

/******************************************
 * Test files to run
 ******************************************/

var tests = [
  'track.js',
  'trackings.js',
  'couriers.js'
];

/******************************************
 * Don't touch below this!
 ******************************************/

var optimist = require('optimist');

var argv = optimist.usage('\n./tests.js OPTIONS', {
  'verbose': {
    description: 'If set, shows verbose output',
    alias: 'v',
    default: false,
    boolean: true
  }
}).argv;

// Choose appropriate reporter
var reporter;
if (argv.verbose) {
  reporter = require('nodeunit').reporters.default;

  // Add directory to each item
  for (var i = 0; i < tests.length; i++) {
    tests[i] = 'test/' + tests[i];
  }

} else {
  reporter = require('nodeunit');

  // Add directory to each item
  for (var i = 0; i < tests.length; i++) {
    tests[i] = __dirname + '/' + tests[i];
  }
}

if (argv.verbose) {
  reporter.run(tests, null);

} else {
  reporter.runFiles(tests);
}

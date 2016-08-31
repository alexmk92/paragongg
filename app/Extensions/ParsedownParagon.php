<?php

namespace App\Extensions;

use Parsedown;

/**
 * Class ParsedownParagon
 * @package App\Extensions
 */
class ParsedownParagon extends Parsedown
{
    /**
     * ParsedownParagon constructor.
     */
    function __construct()
    {
        $this->InlineTypes['{'] []= 'Paragon';
        $this->inlineMarkerList .= '{';
    }

    /**
     * @param $Excerpt
     * @return array
     */
    protected function inlineParagon($Excerpt)
    {
        if (preg_match('/\{{(.*?)\}}/', $Excerpt['text'], $matches)) {
            return array(
                'extent' => strlen($matches[0]),
                'element' => array(
                    'name' => 'span',
                    'attributes' => array(
                        'class' => 'pgg-trigger-tooltip',
                        'data-ref' => $matches[1]
                    ),
                ),
            );
        }
//        if (preg_match('/\{hero:(\w+(?:-\w+)*)\}([^{]+)\{\/hero\}/', $Excerpt['text'], $matches)) {
//            return array(
//                'extent' => strlen($matches[0]),
//                'element' => array(
//                    'name' => 'span',
//                    'text' => $matches[2],
//                    'attributes' => array(
//                        'class'       => 'core-tooltip core-tooltip-hero',
//                        'id'          => $matches[1],
//                        'title'       => 'Tooltip',
//                        'href'        => env('CORE_API_URL').'/api/v'.env('CORE_API_VERSION').'/heroes/'.$matches[1].'?api_token='.env('CORE_API_SECRET'),
//                        'data-source' => env('CORE_API_URL').'/api/v'.env('CORE_API_VERSION').'/heroes/'.$matches[1].'?api_token='.env('CORE_API_SECRET')
//                    ),
//                ),
//            );
//        }
        //<iframe width="560" height="315" src="https://www.youtube.com/embed/y0854CAtH4s" frameborder="0" allowfullscreen></iframe>
        if (preg_match('/\{youtube:(\w+(?:-\w+)*)\}/', $Excerpt['text'], $matches)) {
            $Element = array(
                'name' => 'div',
                'attributes' => array('class' => 'youtube-embed-wrapper'),
                'handler' => 'element',
                'text' => array(
                    'name' => 'iframe',
                    'attributes' => array(
                        'class' => 'youtube-embed',
                        'src'   => 'https://www.youtube.com/embed/'.$matches[1],
                        'width' => '100%',
                        'height' => '0',
                        'frameborder' => '0',
                        'allowfullscreen' => 'true',
                    ),
                    'text' => ''
                ),
            );

            return array(
                'extent' => strlen($matches[0]),
                'element' => $Element,
            );
        }

//        // Deck embed
//        if (preg_match('/\{deck:(\w+(?:-\w+)*)\}/', $Excerpt['text'], $matches)) {
//
//            $Element = array(
//                'name' => 'div',
//                'text' => getDeck($matches[1])
//            );
//
//            return array(
//                'extent' => strlen($matches[0]),
//                'element' => $Element
//            );
//        }

    }
}
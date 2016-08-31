<?php

namespace App\Http\Middleware;

use Closure;

/**
 * Class EB_SSL_Trust
 * @package App\Http\Middleware
 */
class EB_SSL_Trust
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $request->setTrustedProxies( [ $request->getClientIp() ] );
        return $next($request);
    }
}
